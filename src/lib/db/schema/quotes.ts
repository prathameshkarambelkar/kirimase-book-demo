import { quoteSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getQuotes } from "@/lib/api/quotes/queries";


// Schema for quotes - used to validate API requests
const baseSchema = quoteSchema.omit(timestamps)

export const insertQuoteSchema = baseSchema.omit({ id: true });
export const insertQuoteParams = baseSchema.extend({
  bookId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateQuoteSchema = baseSchema;
export const updateQuoteParams = updateQuoteSchema.extend({
  bookId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const quoteIdSchema = baseSchema.pick({ id: true });

// Types for quotes - used to type API request params and within Components
export type Quote = z.infer<typeof quoteSchema>;
export type NewQuote = z.infer<typeof insertQuoteSchema>;
export type NewQuoteParams = z.infer<typeof insertQuoteParams>;
export type UpdateQuoteParams = z.infer<typeof updateQuoteParams>;
export type QuoteId = z.infer<typeof quoteIdSchema>["id"];
    
// this type infers the return from getQuotes() - meaning it will include any joins
export type CompleteQuote = Awaited<ReturnType<typeof getQuotes>>["quotes"][number];

