import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const faqItems = [
  {
    question: 'What is a Cloud PC?',
    answer: 'A Cloud PC is a virtual computer that runs in a secure data center and can be accessed from anywhere, on any device. It offers the power and functionality of a high-end desktop without requiring expensive hardware on your end.'
  },
  {
    question: 'How is SmartPC different from other cloud computing services?',
    answer: 'SmartPC offers industry-leading performance with ultra-low latency, enterprise-grade security, and a seamless user experience designed for professionals. Our proprietary technology delivers better responsiveness and visual quality than competitors.'
  },
  {
    question: 'What kind of internet connection do I need?',
    answer: 'For optimal performance, we recommend a broadband connection with at least 15 Mbps download and 5 Mbps upload speeds. SmartPC works with most home and office connections, and our adaptive streaming technology adjusts to your connection quality.'
  },
  {
    question: 'Can I install my own software on SmartPC?',
    answer: 'Yes! Your SmartPC works just like a regular Windows PC. You have full administrator rights to install, configure, and run any Windows-compatible software you need.'
  },
  {
    question: 'Is my data secure in the cloud?',
    answer: 'Absolutely. SmartPC employs bank-level encryption for all data in transit and at rest. Our infrastructure is compliant with major security standards including SOC 2, GDPR, and HIPAA requirements. Your data remains private and protected at all times.'
  },
  {
    question: 'What happens if I lose internet connection?',
    answer: 'Your SmartPC session remains active for a short period if you disconnect, allowing you to resume exactly where you left off once your connection is restored. Your data is always safely stored in the cloud.'
  },
  {
    question: 'Can I use SmartPC for gaming?',
    answer: 'Yes! Our Professional and Enterprise plans include GPU capabilities suitable for gaming. While we optimize for professional workloads, many games run exceptionally well on our platform.'
  },
  {
    question: 'How do I get started with SmartPC?',
    answer: 'Simply choose a subscription plan, create your account, and you can be up and running with your new Cloud PC in minutes. No complex setup or technical knowledge required.'
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 dark:bg-primary/20 rounded-full mb-4 px-4 py-1.5">
            <span className="text-sm font-medium text-primary">Support</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to know about SmartPC
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mb-8"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for answers..."
              className="pl-10 border-input dark:border-gray-700 dark:bg-gray-800/50 dark:placeholder:text-gray-400 dark:focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="glass-card dark:bg-gray-900/40 dark:border-gray-700/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      <span className="text-lg font-medium">{item.question}</span>
                    </div>
                    <ChevronDown 
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-200",
                        openIndex === index ? 'rotate-180' : ''
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-black/[0.02] dark:bg-white/[0.02]"
                      >
                        <div className="px-6 py-4 text-muted-foreground">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
