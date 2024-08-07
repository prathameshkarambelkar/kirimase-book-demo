import * as z from "zod"
import { CompleteBook, relatedBookSchema } from "./index"

export const reflectionSchema = z.object({
  id: z.string(),
  content: z.string(),
  bookId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteReflection extends z.infer<typeof reflectionSchema> {
  book: CompleteBook
}

/**
 * relatedReflectionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedReflectionSchema: z.ZodSchema<CompleteReflection> = z.lazy(() => reflectionSchema.extend({
  book: relatedBookSchema,
}))
