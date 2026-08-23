import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
  CHATBOT_QUICK_TOPICS,
  CHATBOT_INTENTS,
  matchChatbotIntent,
} from '../../data/chatbotData';

interface ChatbotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  actionUrl?: string;
  actionLabel?: string;
  quickReplies?: string[];
}

const GREETING_TEXT =
  "Hi! I'm your Varna Solar advisor. Ask me about PM Surya Ghar subsidies, savings & ROI, system sizing, net metering, commercial solar, PM KUSUM, and more — or pick a topic below.";

function stripMarkdown(md: string): string {
  return md
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .trim();
}

export const ChatbotPanel: React.FC<ChatbotPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // focus input when opened
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendUserMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { role: 'user', text: trimmed };
    const result = matchChatbotIntent(trimmed);
    const assistantText = stripMarkdown(result.replyMarkdown);
    const assistantMsg: ChatMessage = {
      role: 'assistant',
      text: assistantText,
      actionUrl: result.primaryActionUrl,
      actionLabel: result.primaryActionLabel,
      quickReplies: result.quickReplies,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendUserMessage(input);
  };

  const handleQuickTopic = (promptText: string) => {
    sendUserMessage(promptText);
  };

  const handleQuickReply = (reply: string) => {
    sendUserMessage(reply);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] max-h-[560px] bg-paper-card border border-ink/15 shadow-editorial flex flex-col rounded-none overflow-hidden"
          role="dialog"
          aria-label="Ask Varna chatbot"
          aria-modal="false"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-ink/12 bg-paper-card shrink-0">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/varna-logo2.png"
                alt="Varna Solar"
                width={80}
                height={24}
                className="h-6 w-auto object-contain"
                loading="eager"
              />
              <span className="label-mono text-ink">Ask Varna</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-ink/15 bg-paper hover:bg-ink hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 touch-manipulation"
              aria-label="Close chatbot"
            >
              <X aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>

          {/* Body — independent scroll, excluded from Lenis */}
          <div
            ref={bodyRef}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3 bg-paper-card"
            style={{ WebkitOverflowScrolling: 'touch' as const }}
          >
            {/* Greeting */}
            <div className="bg-paper border border-ink/12 px-3.5 py-3">
              <p className="text-sm leading-relaxed text-ink whitespace-pre-wrap">
                {GREETING_TEXT}
              </p>
            </div>

            {/* Quick topic chips — 2 cols */}
            <div className="grid grid-cols-2 gap-2">
              {CHATBOT_QUICK_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleQuickTopic(topic.promptText)}
                  className="label-mono text-xs leading-tight text-left px-2.5 py-2.5 border border-ink/15 bg-paper hover:bg-sun-tint hover:text-sun hover:border-sun/30 transition-colors rounded-none"
                >
                  {topic.label}
                </button>
              ))}
            </div>

            {/* Chat history */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div className="max-w-[85%] flex flex-col gap-2">
                  <div
                    className={
                      msg.role === 'user'
                        ? 'bg-ink text-paper px-3.5 py-2.5'
                        : 'bg-paper border border-ink/12 px-3.5 py-2.5'
                    }
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {msg.text}
                    </p>
                  </div>

                  {/* Assistant extras: primary action + quick replies */}
                  {msg.role === 'assistant' && (
                    <>
                      {msg.actionUrl && msg.actionLabel && (
                        <Link
                          to={msg.actionUrl}
                          onClick={onClose}
                          className="btn-outline-premium text-xs px-4 py-2 self-start"
                        >
                          {msg.actionLabel}
                        </Link>
                      )}
                      {msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {msg.quickReplies.map((qr, qIdx) => (
                            <button
                              key={qIdx}
                              onClick={() => handleQuickReply(qr)}
                              className="label-mono text-xs px-2.5 py-1.5 border border-ink/15 bg-paper hover:bg-sun-tint hover:text-sun hover:border-sun/30 transition-colors rounded-none"
                            >
                              {qr}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input bar */}
          <form
            onSubmit={handleSubmit}
            className="hairline-t flex gap-2 p-3 bg-paper-card shrink-0"
          >
            <input
              ref={inputRef}
              id="chatbot-input"
              name="chatbot-message"
              type="text"
              autoComplete="off"
              spellCheck={false}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about subsidies, savings, sizing…"
              className="flex-1 w-full min-w-0 border border-ink/20 bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-mute focus:border-sun focus:outline-none focus-visible:ring-2 focus-visible:ring-sun rounded-none touch-manipulation"
              aria-label="Chat message"
            />
            <button
              type="submit"
              className="btn-premium px-5 py-2.5 text-xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
