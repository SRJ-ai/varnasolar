import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { COMPANY_DATA } from '@/data/companyData';

export const WhatsAppWidget: React.FC = () => {
  const phoneNumber = COMPANY_DATA.contact.rawPhone.replace('+', '');
  const message = encodeURIComponent('Hi Varna Solar, I would like to get a quote for a solar rooftop installation.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all group"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25 group-hover:opacity-40" />
      <MessageCircle aria-hidden="true" className="w-7 h-7 md:w-8 md:h-8 relative z-10" strokeWidth={2} />
    </motion.a>
  );
};
