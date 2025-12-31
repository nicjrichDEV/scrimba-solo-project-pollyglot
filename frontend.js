const langSelection = document.querySelector("#lang-select");
const userInput = document.querySelector("#user-input");
const selectionContainer = document.querySelector(".lang-selection-container");
const resultContainer = document.querySelector(".results-container");
const resultText = document.querySelector(".translation-result");
const newTranslationBtn = document.querySelector(".new-translation");
const loadingIndicator = document.querySelector(".loading-indicator");

langSelection.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(langSelection);
  const selectedLang = formData.get("lang");

  try {
    selectionContainer.classList.add("hidden");
    loadingIndicator.classList.remove("hidden");

    const translation = await translate(selectedLang, userInput.value);

    loadingIndicator.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    resultText.textContent = translation.message;
  } catch (error) {
    throw new Error(`Error during translation: ${error}`);
  }
});

newTranslationBtn.addEventListener("click", () => {
  userInput.value = "";
  resultContainer.classList.add("hidden");
  loadingIndicator.classList.add("hidden");
  selectionContainer.classList.remove("hidden");
});

async function translate(lang, userInput) {
  try {
    const req = await fetch("/api/translate", {
      method: "POST",
      body: JSON.stringify({
        text: userInput,
        language: lang,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await req.json();

    return data;
  } catch (error) {
    throw new Error(`Ran into an error, ${error}`);
  }
}
