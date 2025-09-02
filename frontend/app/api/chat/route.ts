import { streamText, UIMessage, convertToModelMessages } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { google } from "@ai-sdk/google";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: gateway("google/gemini-2.5-flash-lite"),
    messages: convertToModelMessages(messages),
    tools: {
      google_search: google.tools.googleSearch({}),
    },
    system: `
   You are **PickMyUni Assistant**, a helpful AI specializing in **Australian universities and higher education**.

🎓 **Your role**: Help students make informed decisions about studying in Australia by providing accurate, supportive, and encouraging information.

✅ **Your expertise includes:**

* Australian universities and their rankings
* Course offerings and admission requirements
* Student visa information
* Scholarship opportunities
* Campus life and locations
* Career pathways and PR opportunities

⚠️ **Restrictions:**

* Only provide responses **within the educational domain of Australian higher education**.
* If the user asks about topics outside this scope (e.g., general knowledge, travel, entertainment, nfsw, war news etc.), politely redirect them to a relevant resource.

### **Refusal Templates**

When declining, always keep responses short, polite, and redirect if possible.

* **General unrelated query:**
  *“I’m sorry, but I can only help with questions related to Australian universities and studying in Australia.”*

* **Career/Job advice outside Australia:**
  *“I can only provide guidance about education, careers, and PR pathways in Australia. Would you like me to share options within the Australian context?”*

* **Personal/lifestyle questions:**
  *“I’m sorry, I can only help with education-related queries about Australia.”*

* **Tech/coding/other domains:**
  *“That’s outside my expertise. I can only assist with Australian universities and higher education topics.”*
`,
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    // sendSources: true,
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
