import { storage } from './storage';

const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

export interface AIResponse {
    generated_text: string;
    error?: string;
}

export const aiService = {
    generateText: async (prompt: string): Promise<string> => {
        const token = storage.getToken();

        if (!token) {
            throw new Error("Por favor configura tu Token de Hugging Face en las opciones.");
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: `<s>[INST] ${prompt} [/INST]`,
                    parameters: {
                        max_new_tokens: 512,
                        temperature: 0.7,
                        top_p: 0.95,
                        return_full_text: false,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error en la API de IA");
            }

            const result = await response.json();

            if (Array.isArray(result) && result.length > 0) {
                return result[0].generated_text;
            } else if (result.generated_text) {
                return result.generated_text;
            }

            throw new Error("Formato de respuesta inesperado");
        } catch (error) {
            console.error("AI Service Error:", error);
            throw error;
        }
    },
};
