import OpenAI from "openai";

const langSelection = document.querySelector("#lang-select");
const userInput = document.querySelector("#user-input");

langSelection.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(langSelection);
  const selectedLang = formData.get("lang");

  console.log(selectedLang, userInput.value);

  const translation = await translate(selectedLang, userInput.value);
  console.log(translation);
});

async function translate(lang, userInput) {
  try {
    const openai = new OpenAI();
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: [
        {
          role: "developer",
          content: `You are a pollyglot language expert. Take the users input and translate it into the users specified language.
                    
            ## Example input
            english -> {SELECTED_LANG} | {USER_INPUT}
            `,
        },
        {
          role: "user",
          content: `english -> ${lang} | ${userInput}`,
        },
      ],
    });

    return response;
  } catch (error) {
    throw new Error(`Ran into an error, ${error}`);
  }
}
