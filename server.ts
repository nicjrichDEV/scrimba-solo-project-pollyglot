import index from "./index.html";
import OpenAI from "openai";

const openai = new OpenAI();

type TranslateRequest = {
  text: string;
  language: string;
};

Bun.serve({
  routes: {
    "/": index,
    "/api/translate": {
      POST: async (req) => {
        const { text, language } = (await req.json()) as TranslateRequest;
        console.log(`Translating: ${text} to ${language}`);

        const translation = await getTranslation(language, text);

        return Response.json({ message: translation });
      },
    },
  },
  development: {
    hmr: true,
    console: true,
  },
});

async function getTranslation(lang: string, text: string) {
  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: [
        {
          role: "developer",
          content: `You are a language pollyglot. You will receive a request to translate a phrase from english into a user specified language
          
          ### Example Input
          english -> {USER_SPECIFIED_LANGUAGE} | {USER_SPECIFIED__PHRASE}
          `,
        },
        {
          role: "user",
          content: `english -> ${lang} | ${text}`,
        },
      ],
    });

    return response.output_text;
  } catch (error) {
    throw new Error(`There was an issue with your request: ${error}`);
  }
}
