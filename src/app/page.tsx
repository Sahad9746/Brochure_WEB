"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, Shield, Camera } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/components/ui/glass-card";

// Data Structure for Pricing
const pricingTiers = {
  marketing: [
    {
      name: "Starter",
      description: "Essential growth tools to establish your brand presence.",
      price: "$2,500",
      period: "/ mo",
      features: [
        "Basic Performance Marketing",
        "Standard Analytics & Reporting",
        "SEO foundations",
        "Social Media Management (1 platform)",
      ],
      popular: false,
    },
    {
      name: "Growth",
      description: "Comprehensive multi-channel strategy for scaling businesses.",
      price: "$5,000",
      period: "/ mo",
      features: [
        "Advanced Performance Marketing",
        "Marketing Automation Setup",
        "Comprehensive SEO Strategy",
        "Content Marketing & Copywriting",
        "Social Media Management (3 platforms)",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Custom revenue acceleration operations for market leaders.",
      price: "Custom",
      period: "",
      features: [
        "Dedicated Growth Team",
        "Omni-channel Campaigns",
        "Custom Machine Learning Analytics",
        "Full-funnel Optimization",
        "24/7 Strategic Consulting",
      ],
      popular: false,
    },
  ],
  orm: [
    {
      name: "Vigilance",
      description: "Basic digital monitoring and reputation safeguarding.",
      price: "$1,800",
      period: "/ mo",
      features: [
        "Brand Search Monitoring",
        "Basic Sentiment Analysis",
        "Review Management Setup",
        "Monthly Health Reports",
      ],
      popular: false,
    },
    {
      name: "Shield",
      description: "Proactive management and suppression of negative narratives.",
      price: "$3,500",
      period: "/ mo",
      features: [
        "Real-time Sentiment Tracking",
        "Crisis Response Protocol",
        "Active Content Suppression",
        "PR distribution",
        "Bi-weekly Strategy Meetings",
      ],
      popular: true,
    },
    {
      name: "Authority",
      description: "Complete ecosystem control and positive asset building.",
      price: "Custom",
      period: "",
      features: [
        "Dedicated Crisis Team",
        "Legal Takedown Assistance",
        "Wikipedia Management",
        "Executive Brand Building",
        "Custom Defense Infrastructures",
      ],
      popular: false,
    },
  ],
  production: [
    {
      name: "Essential",
      description: "Professional core assets for digital campaigns.",
      price: "$4,000",
      period: "/ project",
      features: [
        "1x High-Impact Video (Up to 60s)",
        "Basic Pre-production",
        "Royalty-free Audio",
        "Standard Color Grading",
      ],
      popular: false,
    },
    {
      name: "Cinematic",
      description: "High-end commercial production with storytelling focus.",
      price: "$10,000",
      period: "/ project",
      features: [
        "Multiple Ad Films & Cutdowns",
        "Creative Strategy & Scripting",
        "Professional Talent Casting",
        "Advanced Post-Production VFX",
        "Custom Audio Scoring",
      ],
      popular: true,
    },
    {
      name: "Scale",
      description: "Volume-based visual content operations for continuous growth.",
      price: "$25,000+",
      period: "/ mo",
      features: [
        "Retained Production Crew",
        "Ongoing Social Media Assets",
        "Influencer Content Production",
        "Continuous A/B Testing Variations",
        "Brand Identity Development",
      ],
      popular: false,
    },
  ],
};

const tabs = [
  { id: "marketing", label: "Marketing", desc: "Revenue Acceleration", icon: TrendingUp },
  { id: "orm", label: "ORM", desc: "Trust Security", icon: Shield },
  { id: "production", label: "Production", desc: "Brand Authority", icon: Camera },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<keyof typeof pricingTiers>("marketing");

  return (
    <div className="h-screen w-full font-sans bg-[#0a0a0a] overflow-hidden flex flex-col md:justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 to-transparent pointer-events-none" />
      
      {/* Top Right Logo */}
      <div className="absolute top-0 right-0 p-6 z-50">
        <div className="flex items-center gap-2 text-lg font-bold tracking-tighter">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)]">
            <span className="text-white text-xs">A</span>
          </div>
          <span className="text-white">ADMANICS</span>
        </div>
      </div>

      <main className="w-full h-full max-w-7xl mx-auto px-4 sm:px-8 py-6 md:py-8 lg:py-12 flex flex-col pt-16 md:pt-12 overflow-y-auto md:overflow-visible">
        
        {/* Header Section Compact */}
        <div className="mb-6 md:mb-8 text-left md:text-center shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 md:mb-3">
            Transparent Pricing for <span className="text-gradient">Elite Brands.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Choose the operational focus you need. From revenue generation to reputation security.
          </p>
        </div>

        {/* Tab Selection Navigation Compact */}
        <div className="flex flex-wrap justify-start md:justify-center gap-2 md:gap-4 mb-6 md:mb-8 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as keyof typeof pricingTiers)}
                className={cn(
                  "relative flex items-center gap-2 md:gap-3 px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 border text-left",
                  isActive 
                    ? "bg-[#111111] border-[#6366f1]/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]" 
                    : "bg-transparent border-white/5 hover:border-white/10 hover:bg-[#111111]/50 text-gray-400"
                )}
              >
                <div className={cn("p-1.5 md:p-2 rounded md:rounded-lg", isActive ? "bg-[#6366f1]/20 text-[#a855f7]" : "bg-white/5 text-gray-500")}>
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <div className={cn("text-xs md:text-sm font-bold", isActive ? "text-white" : "text-gray-300")}>{tab.label}</div>
                  <div className={cn("text-[10px] md:text-xs", isActive ? "text-gray-400" : "text-gray-500")}>{tab.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Pricing Cards Compact for 1-screen fit */}
        <div className="flex-1 min-h-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-full pb-8 md:pb-0"
            >
              {pricingTiers[activeTab].map((tier, index) => (
                <div 
                  key={index}
                  className={cn(
                    "relative flex flex-col p-5 md:p-6 lg:p-7 rounded-xl md:rounded-2xl bg-[#0f0f11] border transition-colors h-full",
                    tier.popular ? "border-[#6366f1]/40 shadow-[0_0_30px_-10px_rgba(99,102,241,0.15)]" : "border-white/[0.06] hover:border-white/[0.12]"
                  )}
                >
                  {/* Popular Badge */}
                  {tier.popular && (
                    <div className="absolute top-0 right-6 -translate-y-1/2">
                      <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-2 py-0.5 text-[10px] md:text-xs font-semibold text-white rounded-full">
                        Recommended
                      </div>
                    </div>
                  )}

                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">{tier.name}</h3>
                  <p className="text-xs md:text-sm text-gray-400 mb-4 h-8 md:h-10 leading-tight md:leading-normal shrink-0">{tier.description}</p>
                  
                  <div className="mb-5 md:mb-6 shrink-0">
                    <span className="text-3xl md:text-4xl font-bold text-white">{tier.price}</span>
                    {tier.period && <span className="text-xs md:text-sm text-gray-500 font-medium ml-1">{tier.period}</span>}
                  </div>

                  <GradientButton variant={tier.popular ? "primary" : "outline"} className="w-full mb-5 md:mb-6 py-2 md:py-2.5 text-xs md:text-sm shrink-0">
                    Get Started
                  </GradientButton>

                  <div className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 shrink-0">
                    What's included
                  </div>

                  <ul className="space-y-2 md:space-y-3 flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-xs md:text-sm text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#a855f7] mr-2 md:mr-3 mt-0.5 shrink-0" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
