import { db } from "@/lib/db/index";
import { 
  ReflectionId, 
  NewReflectionParams,
  UpdateReflectionParams, 
  updateReflectionSchema,
  insertReflectionSchema, 
  reflectionIdSchema 
} from "@/lib/db/schema/reflections";
import { getUserAuth } from "@/lib/auth/utils";

export const createReflection = async (reflection: NewReflectionParams) => {
  const { session } = await getUserAuth();
  const newReflection = insertReflectionSchema.parse({ ...reflection, userId: session?.user.id! });
  try {
    const r = await db.reflection.create({ data: newReflection });
    return { reflection: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateReflection = async (id: ReflectionId, reflection: UpdateReflectionParams) => {
  const { session } = await getUserAuth();
  const { id: reflectionId } = reflectionIdSchema.parse({ id });
  const newReflection = updateReflectionSchema.parse({ ...reflection, userId: session?.user.id! });
  try {
    const r = await db.reflection.update({ where: { id: reflectionId, userId: session?.user.id! }, data: newReflection})
    return { reflection: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteReflection = async (id: ReflectionId) => {
  const { session } = await getUserAuth();
  const { id: reflectionId } = reflectionIdSchema.parse({ id });
  try {
    const r = await db.reflection.delete({ where: { id: reflectionId, userId: session?.user.id! }})
    return { reflection: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

