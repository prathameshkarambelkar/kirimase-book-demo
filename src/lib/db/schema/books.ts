import { bookSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getBooks } from "@/lib/api/books/queries";


// Schema for books - used to validate API requests
const baseSchema = bookSchema.omit(timestamps)

export const insertBookSchema = baseSchema.omit({ id: true });
export const insertBookParams = baseSchema.extend({
  completed: z.coerce.boolean(),
  authorId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateBookSchema = baseSchema;
export const updateBookParams = updateBookSchema.extend({
  completed: z.coerce.boolean(),
  authorId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const bookIdSchema = baseSchema.pick({ id: true });

// Types for books - used to type API request params and within Components
export type Book = z.infer<typeof bookSchema>;
export type NewBook = z.infer<typeof insertBookSchema>;
export type NewBookParams = z.infer<typeof insertBookParams>;
export type UpdateBookParams = z.infer<typeof updateBookParams>;
export type BookId = z.infer<typeof bookIdSchema>["id"];
    
// this type infers the return from getBooks() - meaning it will include any joins
export type CompleteBook = Awaited<ReturnType<typeof getBooks>>["books"][number];

