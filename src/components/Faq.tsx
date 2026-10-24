"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item expanded by default

  const faqs = [
    {
      question: "What is Octis jewellery shop management software?",
      answer:
        "Octis is a cloud-based POS and inventory platform built for Indian jewellery retailers. It covers billing, HUID compliance, gold schemes, karigar tracking, and GST reporting in one system.",
    },
    {
      question: "Does Octis support BIS hallmarking and HUID?",
      answer:
        "Yes. Octis includes HUID tracking, compliant tag printing, and digital audit records required for BIS hallmarking compliance across your inventory.",
    },
    {
      question: "Can I manage gold savings schemes and monthly installments?",
      answer:
        "Absolutely. Octis supports customer schemes, installment tracking, scheme redemptions at POS, and full ledger history per customer.",
    },
    {
      question: "Does Octis work for multi-branch jewellery showrooms?",
      answer:
        "Yes. Enterprise plans support multiple branches with centralized reporting, branch-level inventory, and role-based staff access.",
    },
    {
      question: "Is Octis GST compliant for jewellery sales in India?",
      answer:
        "Octis auto-calculates GST on bills, supports CGST/SGST splits, and generates audit-ready tax reports for your CA and compliance needs.",
    },
    {
      question: "How long does onboarding take?",
      answer:
        "Most single-branch shops go live within a few days. We include free data migration support and staff training during your 30-day trial.",
    },
    {
      question: "Can I bill with old gold exchange and split payments?",
      answer:
        "Yes. The POS handles old gold exchange calculations, multiple payment modes (cash, card, UPI), and scheme adjustments in a single transaction.",
    },
    {
      question: "Where is Octis available?",
      answer:
        "Octis is built for jewellery retailers across India. Our cloud platform works on any browser — no special hardware required beyond your existing billing PC and barcode scanner.",
    },
    {
      question: "Which OCTIS plan includes AI features?",
      answer:
        "AI business features begin with the Professional plan. Professional includes AI business insights, stock and dead-stock analysis, profit and margin insights, vendor intelligence and AI alerts and recommendations.",
    },
    {
      question: "What AI features are included in OCTIS Enterprise?",
      answer:
        "Enterprise includes advanced capabilities such as AI catalogue image generation, predictive sales insights, AI purchase recommendations and advanced AI-powered business alerts.",
    },
    {
      question: "Can OCTIS identify dead stock?",
      answer:
        "Professional and Enterprise include AI-powered stock and dead-stock analysis to help identify slow-moving inventory and areas where capital may be tied up.",
    },
    {
      question: "Can OCTIS provide purchase recommendations?",
      answer:
        "AI Purchase Recommendations are included in the Enterprise plan to support purchasing decisions. Recommendations are designed to support human judgment and operational planning, without guaranteeing demand or profitability outcomes.",
    },
    {
      question: "Does OCTIS support business-specific customisation?",
      answer:
        "Yes. Enterprise can be customised around business workflows, roles, permissions, approvals, reporting and operational requirements.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 landing-surface relative scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="landing-section-label mb-3">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-5 text-foreground">
            Questions from Indian jewellers
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            Everything you need to know about switching to Octis.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="landing-feature-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-foreground hover:bg-gold-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-t-xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span className="text-base sm:text-base leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-600 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className="px-6 pb-4 text-brown-500 text-sm leading-relaxed border-t border-gold-200/40 pt-3 animate-in fade-in duration-150"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
