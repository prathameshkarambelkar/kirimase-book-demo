import * as z from "zod"
import { CompleteBook, relatedBookSchema } from "./index"

export const quoteSchema = z.object({
  id: z.string(),
  content: z.string(),
  bookId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteQuote extends z.infer<typeof quoteSchema> {
  book: CompleteBook
}

/**
 * relatedQuoteSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedQuoteSchema: z.ZodSchema<CompleteQuote> = z.lazy(() => quoteSchema.extend({
  book: relatedBookSchema,
}))
