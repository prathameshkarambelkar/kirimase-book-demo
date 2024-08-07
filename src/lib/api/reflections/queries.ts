import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type ReflectionId, reflectionIdSchema } from "@/lib/db/schema/reflections";

export const getReflections = async () => {
  const { session } = await getUserAuth();
  const r = await db.reflection.findMany({ where: {userId: session?.user.id!}, include: { book: true}});
  return { reflections: r };
};

export const getReflectionById = async (id: ReflectionId) => {
  const { session } = await getUserAuth();
  const { id: reflectionId } = reflectionIdSchema.parse({ id });
  const r = await db.reflection.findFirst({
    where: { id: reflectionId, userId: session?.user.id!},
    include: { book: true }
  });
  return { reflection: r };
};


