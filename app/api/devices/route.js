import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export async function POST(req) {
  const data = await req.json();

  const { deviceStatus, appliance, timestamp } = data;

  // Initialize OpenAI client for embeddings
  const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.Index("ecosense");

  const inputData = {
    deviceStatus,
    appliance,
    timestamp,
  };

  const inputText = `Device Status: ${deviceStatus}, Appliance: ${appliance}, Timestamp: ${timestamp}`;

  try {
    const [date, time] = timestamp.split(", ");

    // 4. Generate embeddings using OpenAI
    const embeddingResponse = await openAIClient.embeddings.create({
      input: inputText,
      model: "text-embedding-3-small", // Adjust the model as needed
    });

    // Check if the embedding data is available
    if (embeddingResponse.data && embeddingResponse.data.length > 0) {
      const embedding = embeddingResponse.data[0].embedding; // Embedding vector

      // 5. Prepare the data for upserting into Pinecone
      const upsertData = {
        id: `${appliance}_${timestamp}`,  // Unique ID (appliance and timestamp)
        values: embedding,             // Embedding vector
        metadata: {
          appliance: appliance,
          deviceStatus: deviceStatus,
          date: date,
          time: time,
        },
      };

      // 6. Upsert the data into Pinecone
      await index.namespace("ns1").upsert([upsertData]);

      const queryResponse = await index.namespace("ns1").query({
        vector: embedding,
        topK: 30,
        includeMetadata: true,
      })
      console.log(queryResponse)
      const results = queryResponse.matches;
      let similar = 0;

      results.forEach((match) => {
        if (match.score >= 0.99) { // If using cosine similarity and score > 0.9
          similar += 1;
        }
      });

      // Check if the number of similar items is greater than 5
      if (similar > 20) {
        // Prepare the prompt for OpenAI to generate a custom message
        const prompt = `The user likes to turn ${deviceStatus} the ${appliance} around ${time}. Generate a message suggesting to automate this schedule to save electricity and money.`;

        // Generate the custom message using OpenAI
        const completion = await openAIClient.chat.completions.create({
          model: "gpt-3.5-turbo", // Use a valid chat model
          messages: [
              { role: "user", content: prompt }
          ],
          max_tokens: 50,
              });

        const aiGeneratedMessage = completion.choices[0].message.content.trim();

        // Return a message indicating similar data found
        return new Response(JSON.stringify({
          message: aiGeneratedMessage,
          success: true
        }), { status: 200 });
      } else {
        return new Response("Not enough similarities", { status: 200 });
      }

      return new Response("Data upserted successfully", { status: 200 });
    } else {
      console.error("Embedding creation failed");
      return new Response("Failed to generate embedding", { status: 500 });
    }
  } catch (error) {
    console.error("Error in embedding or upsert process:", error);
    return new Response("An error occurred", { status: 500 });
  }
}
