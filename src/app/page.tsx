"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TrendingUp, Shield, Camera, Loader2 } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/components/ui/glass-card";
import { client } from "@/sanity/lib/client";

// Data Structure for Pricing
type RegionCodes = "US" | "IN" | "GCC" | "EU";

type TierData = {
  name: string;
  description: string;
  prices: { US: string; IN: string; GCC: string; EU: string };
  period: string;
  features: string[];
  popular: boolean;
};

type PricingTiersType = {
  marketing: TierData[];
  orm: TierData[];
  production: TierData[];
};

// Default empty scaffold while loading
const defaultPricingTiers: PricingTiersType = {
  marketing: [],
  orm: [],
  production: [],
};

const tabs = [
  { id: "marketing", label: "Marketing", desc: "Revenue Acceleration", icon: TrendingUp, headline: "Revenue Acceleration", hook: "Stop guessing. Start growing.", copy: "We combine data intelligence with creative storytelling to turn your brand into a market leader. From ROI-focused performance marketing to organic SEO dominance, we build the engine that drives your revenue forward.", focus: "Efficiency at Scale & Strategic Storytelling." },
  { id: "orm", label: "ORM", desc: "Trust Security", icon: Shield, headline: "Trust Security", hook: "Your reputation is your strongest currency.", copy: "In a digital-first world, perception is reality. We provide 24/7 digital vigilance, sentiment analysis, and rapid crisis communication to ensure your brand remains bulletproof. We don't just monitor the conversation; we shape it.", focus: "Emergency Response & Brand Integrity." },
  { id: "production", label: "Production", desc: "Brand Authority", icon: Camera, headline: "Brand Authority", hook: "Visual excellence that demands attention.", copy: "High-impact brands aren’t just seen—they are felt. From cinematic ad films and professional product photography to immersive audio media, we produce high-fidelity content that establishes you as the ultimate authority in your industry.", focus: "Cinematic Excellence & Modern Networking." },
];

export default function Home() {
  const [pricingTiers, setPricingTiers] = useState<PricingTiersType>(defaultPricingTiers);
  const [activeTab, setActiveTab] = useState<keyof PricingTiersType>("marketing");
  const [region, setRegion] = useState<RegionCodes>("US");
  const [showToggle, setShowToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch live data from Sanity
  useEffect(() => {
    async function fetchTiers() {
      try {
        const query = `*[_type == "pricingTier"] | order(orderRank asc)`;
        const data = await client.fetch(query);

        // Map Sanity documents into our grouped UI model
        const mapping: PricingTiersType = {
          marketing: [],
          orm: [],
          production: [
            {
              name: "Cinematic",
              description: "High-end commercial production with storytelling focus.",
              prices: {
                US: "$2499",
                IN: "₹25K",
                GCC: "$2999",
                EU: "€2999",
              },
              period: "",
              features: [
                "Multiple Ad Films & Cutdowns",
                "Creative Strategy & Scripting",
                "Professional Talent Casting",
                "Custom Audio Scoring",
              ],
              popular: true,
            },
          ],
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.forEach((item: any) => {
          const cat = item.serviceCategory as keyof PricingTiersType;
          if (mapping[cat] && cat !== "production") {
            mapping[cat].push({
              name: item.tierName || "",
              description: item.description || "",
              prices: {
                US: item.priceUSD || "Custom",
                IN: item.priceINR || "Custom",
                GCC: item.priceGCC || "Custom",
                EU: item.priceEUR || "Custom",
              },
              period: item.period || "",
              features: item.features || [],
              popular: item.isPopular || false,
            });
          }
        });

        setPricingTiers(mapping);
      } catch (error) {
        console.error("Error fetching sanity pricing data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTiers();
  }, []);

  useEffect(() => {
    // 1. Check URL override first
    const params = new URLSearchParams(window.location.search);
    const regionParam = params.get("region")?.toUpperCase();

    if (regionParam === "IN" || regionParam === "ARAB" || regionParam === "US") {
      setRegion(regionParam as RegionCodes);
      return;
    }

    // 2. Perform safe auto-detection via TimeZone if no parameter
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone.includes("Calcutta") || timeZone.includes("Kolkata") || timeZone.includes("Asia/Colombo")) {
        setRegion("IN");
      } else if (
        timeZone.includes("Dubai") ||
        timeZone.includes("Riyadh") ||
        timeZone.includes("Qatar") ||
        timeZone.includes("Kuwait")
      ) {
        setRegion("GCC");
      } else if (
        timeZone.includes("Europe/") ||
        timeZone.includes("London") ||
        timeZone.includes("Berlin") ||
        timeZone.includes("Paris") ||
        timeZone.includes("Rome") ||
        timeZone.includes("Madrid") ||
        timeZone.includes("Amsterdam")
      ) {
        setRegion("EU");
      }
    } catch (e: unknown) {
      console.log("Timezone parsing skipped.");
    }
  }, []);

  return (
    <div className="h-screen w-full font-sans bg-[#0a0a0a] overflow-hidden flex flex-col md:justify-center relative">

      {/* Top Header Region (Logo + Toggles) */}
      <div className="absolute top-0 right-0 p-4 md:p-6 z-50 flex items-center gap-4 md:gap-6">
        {/* Region Toggle Dropdown/Pills (Hidden by default, unlocked by double clicking logo) */}
        {showToggle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md"
          >
            {(["US", "IN", "GCC", "EU"] as RegionCodes[]).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300",
                  region === r
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {r === "US" ? "USD" : r === "IN" ? "INR" : r === "GCC" ? "GCC (USD)" : "EUR"}
              </button>
            ))}
          </motion.div>
        )}

        {/* Admanics Logo (Double click to reveal toggle) */}
        <div
          className="flex items-center gap-2 text-lg font-bold tracking-tighter cursor-pointer"
          onDoubleClick={() => setShowToggle(!showToggle)}
          title="Double click to reveal region overrides"
        >
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)]">
            <span className="text-white text-xs">A</span>
          </div>
          <span className="text-white hidden sm:block">ADMANICS</span>
        </div>
      </div>

      <main className="w-full h-full max-w-7xl mx-auto px-4 sm:px-8 py-6 md:py-8 lg:py-12 flex flex-col pt-16 md:pt-12 overflow-y-auto md:overflow-visible">

        {/* Dynamic Pillar Header Compact */}
        <div className="mb-3 md:mb-5 text-left shrink-0 max-w-4xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 drop-shadow-none [text-shadow:none]">
            {tabs.find((t) => t.id === activeTab)?.headline}
          </h1>
          <p className="text-base md:text-lg font-bold text-[#c084fc] mb-3 drop-shadow-none [text-shadow:none]">
            {tabs.find((t) => t.id === activeTab)?.hook}
          </p>
          <p className="text-[13px] md:text-sm text-gray-200 mb-3 leading-relaxed md:leading-relaxed drop-shadow-none [text-shadow:none]">
            {tabs.find((t) => t.id === activeTab)?.copy}
          </p>
          <p className="text-[10px] md:text-xs font-semibold tracking-wider text-gray-400 uppercase drop-shadow-none [text-shadow:none]">
            Key Focus: <span className="text-[#e879f9] ml-2">{tabs.find((t) => t.id === activeTab)?.focus}</span>
          </p>
        </div>

        {/* Tab Selection Navigation Compact */}
        <div className="flex flex-wrap justify-start gap-2 md:gap-4 mb-4 md:mb-6 shrink-0 z-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as keyof typeof pricingTiers)}
                className={cn(
                  "relative flex items-center gap-2 md:gap-3 px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 border text-left group",
                  isActive
                    ? "bg-[#111111] border-[#6366f1]/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]"
                    : (tab.id === "orm"
                      ? "bg-transparent border-white/5 hover:border-[#a855f7]/60 hover:shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)] hover:bg-[#111111]/50 text-gray-400"
                      : "bg-transparent border-white/5 hover:border-white/10 hover:bg-[#111111]/50 text-gray-400")
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
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-[#6366f1] animate-spin opacity-50" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "grid gap-4 md:gap-6 h-full pb-8 md:pb-0",
                  activeTab === "production" ? "grid-cols-1 max-w-[400px] mx-auto w-full" : "grid-cols-1 md:grid-cols-3"
                )}
              >
                {pricingTiers[activeTab].map((tier, index) => (
                  <div
                    key={index}
                    onClick={() => window.location.href = "https://admanics.com/contact"}
                    className={cn(
                      "relative flex flex-col p-5 md:p-6 lg:p-7 rounded-xl md:rounded-2xl bg-[#0f0f11] border transition-all duration-300 h-full cursor-pointer hover:-translate-y-2",
                      tier.popular
                        ? "border-[#6366f1]/40 shadow-[0_0_30px_-10px_rgba(99,102,241,0.15)] hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.3)]"
                        : (activeTab === "orm"
                          ? "border-white/[0.06] hover:border-[#a855f7]/50 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]"
                          : "border-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.05)]")
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
                      {activeTab === "production" && (
                        <div className="text-sm text-[#a855f7] font-semibold mb-1 uppercase tracking-wider">Starting from</div>
                      )}
                      <span className="text-3xl md:text-4xl font-bold text-white">{tier.prices[region]}</span>
                      {tier.period && <span className="text-xs md:text-sm text-gray-500 font-medium ml-1">{tier.period}</span>}
                    </div>

                    <GradientButton variant={tier.popular ? "primary" : "outline"} className="w-full mb-5 md:mb-6 py-2 md:py-2.5 text-xs md:text-sm shrink-0 cursor-pointer">
                      Get Started
                    </GradientButton>

                    <div className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 shrink-0">
                      What&apos;s included
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
          )}
        </div>
        {/* Footer CTA */}
        <div className="mt-3 md:mt-4 shrink-0 text-center border-t border-white/[0.05] pt-4 md:pt-6 pb-2">
          <h2 className="text-lg md:text-2xl font-bold text-white mb-3">
            Your Vision, Our Capability.
          </h2>
          {/* <GradientButton variant="primary" className="px-8 py-2 md:py-2.5 text-xs md:text-sm mb-2 shadow-[0_0_20px_-5px_var(--color-accent-purple)]">
            Partner with Admanics
          </GradientButton> */}
          {/* <p className="text-[10px] md:text-xs text-gray-500">
            Experience the next level of brand empowerment at <span className="text-white">admanics.com</span>
          </p> */}
        </div>
      </main>
    </div>
  );
}
