
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const client = new ElevenLabsClient({
    apiKey: "sk_e2dcaebb78fa4f73ff031062103c1e98d12ff776d3dddbf7"
});

async function createAgent() {
    try {
        console.log("Creating agent...");
        const agent = await client.conversationalAi.agents.create({
            name: "Fotabong Support Bot",
            conversationConfig: {
                agent: {
                    prompt: {
                        prompt: "You are a helpful assistant for Fotabong Royal Enterprise, a construction and engineering company in Cameroon. You can answer questions about our services (Roads, Bridges, Land Acquisition, Design) and help clients book consultations. Be professional, polite, and concise.",
                    },
                    firstMessage: "Hello! content Welcome to Fotabong Royal Enterprise. How can I assist you with your construction needs today?",
                },
            },
        });

        console.log("Agent created successfully!");
        console.log("AGENT_ID:", agent.agent_id);
    } catch (error) {
        console.error("Error creating agent:", error);
    }
}

createAgent();
