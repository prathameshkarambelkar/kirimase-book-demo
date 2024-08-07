import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type QuoteId, quoteIdSchema } from "@/lib/db/schema/quotes";

export const getQuotes = async () => {
  const { session } = await getUserAuth();
  const q = await db.quote.findMany({ where: {userId: session?.user.id!}, include: { book: true}});
  return { quotes: q };
};

export const getQuoteById = async (id: QuoteId) => {
  const { session } = await getUserAuth();
  const { id: quoteId } = quoteIdSchema.parse({ id });
  const q = await db.quote.findFirst({
    where: { id: quoteId, userId: session?.user.id!},
    include: { book: true }
  });
  return { quote: q };
};


