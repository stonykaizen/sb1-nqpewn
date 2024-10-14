import Groq from "groq-sdk";

let groq = null;

export const initializeGroq = (apiKey) => {
  groq = new Groq({ apiKey });
};

export const getGroqChatCompletion = async (message) => {
  if (!groq) {
    throw new Error("Groq has not been initialized with an API key");
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192",
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error getting chat completion:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};