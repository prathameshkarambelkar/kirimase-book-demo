import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type BookId, bookIdSchema } from "@/lib/db/schema/books";

export const getBooks = async () => {
  const { session } = await getUserAuth();
  const b = await db.book.findMany({ where: {userId: session?.user.id!}, include: { author: true}});
  return { books: b };
};

export const getBookById = async (id: BookId) => {
  const { session } = await getUserAuth();
  const { id: bookId } = bookIdSchema.parse({ id });
  const b = await db.book.findFirst({
    where: { id: bookId, userId: session?.user.id!},
    include: { author: true }
  });
  return { book: b };
};

export const getBookByIdWithQuotesAndReflections = async (id: BookId) => {
  const { session } = await getUserAuth();
  const { id: bookId } = bookIdSchema.parse({ id });
  const b = await db.book.findFirst({
    where: { id: bookId, userId: session?.user.id!},
    include: { author: { include: {books: true } }, quotes: { include: {book: true } }, reflections: { include: {book: true } } }
  });
  if (b === null) return { book: null };
  const { author, quotes, reflections, ...book } = b;

  return { book, author:author, quotes:quotes, reflections:reflections };
};

