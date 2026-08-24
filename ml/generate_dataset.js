const fs = require('fs');
const path = require('path');

// Mocking the raw data based on what Varna Solar does
const QA_PAIRS = [
  {
    instruction: "What is Varna Solar?",
    response: "Varna Solar is a leading Solar EPC (Engineering, Procurement, and Construction) company operating in Telangana and Andhra Pradesh. We specialize in residential, commercial, and industrial turnkey solar solutions."
  },
  {
    instruction: "Where is Varna Solar located?",
    response: "Our headquarters are located in Hyderabad, Telangana. We also have branch offices across major districts in Telangana and Andhra Pradesh to ensure rapid service deployment."
  },
  {
    instruction: "Does Varna Solar provide residential solar solutions?",
    response: "Yes, we provide Tier-1 residential rooftop solar installations. We fully integrate with the PM Surya Ghar Muft Bijli Yojana scheme, helping homeowners get up to ₹78,000 in Central Financial Assistance."
  },
  {
    instruction: "What is the PM Surya Ghar subsidy?",
    response: "The PM Surya Ghar Muft Bijli Yojana provides a Central Financial Assistance (CFA) subsidy of ₹30,000 per kW up to 2kW, and an additional ₹18,000 for the 3rd kW. The maximum subsidy is capped at ₹78,000 for residential systems 3kW and above."
  },
  {
    instruction: "How much capacity has Varna Solar installed?",
    response: "Varna Solar has successfully installed over 50 MW of cumulative solar capacity across 1,500+ projects, ranging from residential rooftops to multi-megawatt industrial parks."
  },
  {
    instruction: "What kind of solar panels does Varna Solar use?",
    response: "We exclusively use Tier-1 monocrystalline half-cut bifacial modules, ensuring maximum efficiency, high durability, and optimal performance even in low-light conditions. We offer a 25-year linear performance warranty."
  },
  {
    instruction: "How long does a commercial solar installation take?",
    response: "For a standard commercial rooftop installation (e.g., 50kW to 200kW), the entire turnkey process takes approximately 4 to 6 weeks, including site surveying, structural engineering, installation, and DISCOM net-metering approvals."
  },
  {
    instruction: "What is net metering?",
    response: "Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid. Varna Solar handles 100% of the DISCOM synchronization and net-metering paperwork in Telangana (TSSPDCL/TSNPDCL) and AP (APSPDCL/APEPDCL)."
  },
  {
    instruction: "How can I get a quote from Varna Solar?",
    response: "You can use our online Solar ROI Calculator to get an instant estimate, or contact our sales team at our official phone number or email to book a free site survey."
  },
  {
    instruction: "Does Varna Solar handle O&M (Operations and Maintenance)?",
    response: "Yes, we offer comprehensive O&M services including 24/7 remote monitoring via our mobile app, bi-annual physical cleaning, and preventative maintenance to ensure your plant operates at 99.8% uptime."
  }
];

// Generate additional variations for robust fine-tuning
const dataset = [];

QA_PAIRS.forEach(pair => {
  // Alpaca/Gemma formatting:
  // "Below is an instruction that describes a task. Write a response that appropriately completes the request."
  dataset.push({
    text: `User: ${pair.instruction}\nAssistant: ${pair.response}<eos>`
  });
});

const outDir = path.join(__dirname, 'dataset');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

const outFile = path.join(outDir, 'varna_solar_dataset.jsonl');
const content = dataset.map(d => JSON.stringify(d)).join('\n');
fs.writeFileSync(outFile, content, 'utf8');

console.log(`Generated ${dataset.length} QA pairs at ${outFile}`);
