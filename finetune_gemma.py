import os
import torch
from datasets import load_dataset
from trl import SFTTrainer
from transformers import TrainingArguments
from unsloth import FastLanguageModel

# 1. Configuration
MODEL_NAME = "unsloth/gemma-2b-it-bnb-4bit" # 4-bit quantized Gemma 2B for local efficiency
MAX_SEQ_LENGTH = 2048
DATASET_PATH = "dataset/varna_solar_dataset.jsonl"
OUTPUT_DIR = "varna_solar_gemma_lora"

print(f"Loading {MODEL_NAME}...")

# 2. Load Model & Tokenizer via Unsloth
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = MODEL_NAME,
    max_seq_length = MAX_SEQ_LENGTH,
    dtype = None, # Auto detection
    load_in_4bit = True,
)

# 3. Add LoRA Adapters
print("Adding LoRA adapters...")
model = FastLanguageModel.get_peft_model(
    model,
    r = 16, # Rank
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_alpha = 16,
    lora_dropout = 0,
    bias = "none",
    use_gradient_checkpointing = "unsloth",
    random_state = 3407,
    use_rslora = False,
    loftq_config = None,
)

# 4. Load Dataset
print(f"Loading dataset from {DATASET_PATH}...")
dataset = load_dataset("json", data_files=DATASET_PATH, split="train")

# 5. Setup Trainer
trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = dataset,
    dataset_text_field = "text",
    max_seq_length = MAX_SEQ_LENGTH,
    dataset_num_proc = 2,
    packing = False,
    args = TrainingArguments(
        per_device_train_batch_size = 2,
        gradient_accumulation_steps = 4,
        warmup_steps = 5,
        max_steps = 60, # Small number of steps for this mini-dataset
        learning_rate = 2e-4,
        fp16 = not torch.cuda.is_bf16_supported(),
        bf16 = torch.cuda.is_bf16_supported(),
        logging_steps = 1,
        optim = "adamw_8bit",
        weight_decay = 0.01,
        lr_scheduler_type = "linear",
        seed = 3407,
        output_dir = OUTPUT_DIR,
    ),
)

# 6. Train Model
print("Starting training...")
trainer_stats = trainer.train()

# 7. Save LoRA Weights
print(f"Saving LoRA adapters to {OUTPUT_DIR}...")
model.save_pretrained(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)

print("Training complete! You can now run inference using the saved adapters.")
