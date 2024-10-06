import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export async function GET(req) {
  const data = await req.json();
  const { deviceStatus, appliance, timestamp } = data;

  // Initialize Pinecone client
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.Index("ecosense");

  // Initialize openai api
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const inputData = {
    deviceStatus,
    appliance,
    timestamp,
  };

  const inputText = `Device Status: ${deviceStatus}, Appliance: ${appliance}, Timestamp: ${timestamp}`;

  try {
    const [date, time] = timestamp.split(", ");

    // 4. Generate embeddings using OpenAI
    const embeddingResponse = await openai.embeddings.create({
      input: inputText,
      model: "text-embedding-3-small", // Adjust the model as needed
    });

    // Check if the embedding data is available
    if (embeddingResponse.data && embeddingResponse.data.length > 0) {
      const embedding = embeddingResponse.data[0].embedding; // Embedding vector

      const queryResponse = await index.query({
        vector: embedding,
        topK: 10,
        includeMetadata: true,
        namespace: "ns1",
      })

      const results = queryResponse.matches;
      let similar = 0;

      results.forEach((match) => {
        if (match.score > 0.9 && match.metadata.appliance == appliance) { // If using cosine similarity and score > 0.9
          similar += 1;
        }
      });

      // Check if the number of similar items is greater than 5
      if (similarItems.length > 5) {
        // Prepare the prompt for OpenAI to generate a custom message
        const prompt = `The user keeps turning off the ${appliance} around ${time}. Generate a friendly message to suggest automating this action.`;

        // Generate the custom message using OpenAI
        const completion = await openai.completions.create({
          model: "text-davinci-003", // Or use the latest model
          prompt: prompt,
          max_tokens: 50, // Limit to an appropriate length
        });

        const aiGeneratedMessage = completion.choices[0].text.trim();

        // Return a message indicating similar data found
        return new Response(JSON.stringify({
          message: aiGeneratedMessage,
          success: true
        }), { status: 200 });
      } else {
        return new Response("Not enough similarities", { status: 200 });
      }

      return new Response("Data grabbed", { status: 200 });
    } else {
      console.error("Query failed");
      return new Response("Failed to query", { status: 500 });
    }
  } catch (error) {
    console.error("Error in query process:", error);
    return new Response("An error occurred", { status: 500 });
  }

}