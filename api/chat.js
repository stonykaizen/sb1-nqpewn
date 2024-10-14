import Groq from 'groq-sdk';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const groq = new Groq({ 
      apiKey: process.env.GROQ_API_KEY,
      dangerouslyAllowBrowser: true // Only use this for development!
    });

    try {
      const { message } = req.body;
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "llama3-8b-8192",
      });

      const response = chatCompletion.choices[0]?.message?.content || "";
      res.status(200).json({ response });
    } catch (error) {
      console.error("Error getting chat completion:", error);
      res.status(500).json({ error: error.message || "An error occurred while processing your request." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}