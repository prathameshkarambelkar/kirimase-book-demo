import { db } from "@/lib/db/index";
import { 
  QuoteId, 
  NewQuoteParams,
  UpdateQuoteParams, 
  updateQuoteSchema,
  insertQuoteSchema, 
  quoteIdSchema 
} from "@/lib/db/schema/quotes";
import { getUserAuth } from "@/lib/auth/utils";

export const createQuote = async (quote: NewQuoteParams) => {
  const { session } = await getUserAuth();
  const newQuote = insertQuoteSchema.parse({ ...quote, userId: session?.user.id! });
  try {
    const q = await db.quote.create({ data: newQuote });
    return { quote: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuote = async (id: QuoteId, quote: UpdateQuoteParams) => {
  const { session } = await getUserAuth();
  const { id: quoteId } = quoteIdSchema.parse({ id });
  const newQuote = updateQuoteSchema.parse({ ...quote, userId: session?.user.id! });
  try {
    const q = await db.quote.update({ where: { id: quoteId, userId: session?.user.id! }, data: newQuote})
    return { quote: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuote = async (id: QuoteId) => {
  const { session } = await getUserAuth();
  const { id: quoteId } = quoteIdSchema.parse({ id });
  try {
    const q = await db.quote.delete({ where: { id: quoteId, userId: session?.user.id! }})
    return { quote: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

