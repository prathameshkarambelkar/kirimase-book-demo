import * as z from "zod"
import { CompleteAuthor, relatedAuthorSchema, CompleteQuote, relatedQuoteSchema, CompleteReflection, relatedReflectionSchema } from "./index"

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  authorId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteBook extends z.infer<typeof bookSchema> {
  author: CompleteAuthor
  quotes: CompleteQuote[]
  reflections: CompleteReflection[]
}

/**
 * relatedBookSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedBookSchema: z.ZodSchema<CompleteBook> = z.lazy(() => bookSchema.extend({
  author: relatedAuthorSchema,
  quotes: relatedQuoteSchema.array(),
  reflections: relatedReflectionSchema.array(),
}))
