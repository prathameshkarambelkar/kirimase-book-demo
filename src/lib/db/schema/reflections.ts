import { reflectionSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getReflections } from "@/lib/api/reflections/queries";


// Schema for reflections - used to validate API requests
const baseSchema = reflectionSchema.omit(timestamps)

export const insertReflectionSchema = baseSchema.omit({ id: true });
export const insertReflectionParams = baseSchema.extend({
  bookId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateReflectionSchema = baseSchema;
export const updateReflectionParams = updateReflectionSchema.extend({
  bookId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const reflectionIdSchema = baseSchema.pick({ id: true });

// Types for reflections - used to type API request params and within Components
export type Reflection = z.infer<typeof reflectionSchema>;
export type NewReflection = z.infer<typeof insertReflectionSchema>;
export type NewReflectionParams = z.infer<typeof insertReflectionParams>;
export type UpdateReflectionParams = z.infer<typeof updateReflectionParams>;
export type ReflectionId = z.infer<typeof reflectionIdSchema>["id"];
    
// this type infers the return from getReflections() - meaning it will include any joins
export type CompleteReflection = Awaited<ReturnType<typeof getReflections>>["reflections"][number];

