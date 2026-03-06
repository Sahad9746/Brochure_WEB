import { defineField, defineType } from "sanity";

export const pricingTierType = defineType({
  name: "pricingTier",
  title: "Pricing Tier",
  type: "document",
  fields: [
    defineField({
      name: "serviceCategory",
      title: "Service Category",
      type: "string",
      options: {
        list: [
          { title: "Marketing", value: "marketing" },
          { title: "ORM", value: "orm" },
          { title: "Production", value: "production" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tierName",
      title: "Tier Name",
      description: "e.g., Starter, Growth, Enterprise",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      title: "Billing Period",
      description: "e.g., / mo or / project. Type 'Custom' to hide the price fields.",
      type: "string",
    }),
    defineField({
      name: "priceUSD",
      title: "Price (USD)",
      description: "e.g., $2,500. Automatically set to 'Custom' if Billing Period is Custom.",
      type: "string",
      hidden: ({ document }) => document?.period?.toString().toLowerCase() === "custom",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.period?.toString().toLowerCase() === "custom") return true;
          return value ? true : "Required unless Billing Period is Custom";
        }),
    }),
    defineField({
      name: "priceINR",
      title: "Price (INR)",
      description: "e.g., ₹2,00,000. Automatically set to 'Custom' if Billing Period is Custom.",
      type: "string",
      hidden: ({ document }) => document?.period?.toString().toLowerCase() === "custom",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.period?.toString().toLowerCase() === "custom") return true;
          return value ? true : "Required unless Billing Period is Custom";
        }),
    }),
    defineField({
      name: "priceGCC",
      title: "Price (GCC / USD)",
      description: "e.g., $1,000. Automatically set to 'Custom' if Billing Period is Custom.",
      type: "string",
      hidden: ({ document }) => document?.period?.toString().toLowerCase() === "custom",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.period?.toString().toLowerCase() === "custom") return true;
          return value ? true : "Required unless Billing Period is Custom";
        }),
    }),
    defineField({
      name: "priceEUR",
      title: "Price (Europe / EUR)",
      description: "e.g., €1,200. Automatically set to 'Custom' if Billing Period is Custom.",
      type: "string",
      hidden: ({ document }) => document?.period?.toString().toLowerCase() === "custom",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.period?.toString().toLowerCase() === "custom") return true;
          return value ? true : "Required unless Billing Period is Custom";
        }),
    }),
    defineField({
      name: "features",
      title: "Features List",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "isPopular",
      title: "Is Popular? (Recommended Badge)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      description: "1 = Left, 2 = Middle, 3 = Right",
      type: "number",
      validation: (rule) => rule.required().min(1).max(10),
    }),
  ],
  preview: {
    select: {
      title: "tierName",
      subtitle: "serviceCategory",
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title} Tier`,
        subtitle: subtitle ? subtitle.toUpperCase() : "Unknown",
      };
    },
  },
});
