import { streamText, UIMessage, convertToModelMessages } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { google, GoogleGenerativeAIProviderMetadata } from "@ai-sdk/google";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Previous Perplexity implementation (commented out)
  // const result = streamText({
  //   model: webSearch ? "perplexity/sonar" : model,
  //   messages: convertToModelMessages(messages),
  //   system:
  //     "You are a helpful assistant that can answer questions and help with tasks",
  // });

  // New AI Gateway implementation with Google Gemini
  const result = streamText({
    model: gateway("perplexity/sonar"),
    messages: convertToModelMessages(messages),
    tools: {
      google_search: google.tools.googleSearch({}),
    },
    system: `You are PickMyUni Assistant, a helpful AI specializing in Australian universities and higher education. 
    You help students find the right university, understand admission requirements, compare programs, and navigate the Australian education system.
    
    Your expertise includes:
    - Australian universities and their rankings
    - Course offerings and admission requirements
    - Student visa information
    - Scholarship opportunities
    - Campus life and locations
    - Career pathways and PR opportunities
    
    Always provide accurate, helpful, and encouraging responses to help students make informed decisions about their education in Australia.
    Never ask for personal information.
    `,
  });

  // send response back to the client with original messages to prevent duplication
  // Re-enabling sources since Perplexity/Sonar provides them
  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    sendSources: true,
    // sendReasoning: true,
    onError: (error) => {
      console.error("Chat API Error:", error);
      // Return a user-friendly error message
      if (error instanceof Error) {
        return `I'm sorry, I encountered an issue: ${error.message}`;
      }
      return "I apologize, but something went wrong. Please try again.";
    },
  });
}
