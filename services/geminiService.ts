
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { Theme, StoryHistoryEntry, StoryPart } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const baseSystemInstruction = `Tu es un assistant IA spécialisé dans la création d'histoires interactives et profondément apaisantes pour le coucher, destinées aux jeunes enfants (3-7 ans). Ton objectif est de générer des histoires qui, lues à voix haute, durent entre 5 et 10 minutes, favorisant la relaxation et l'aide au sommeil. Chaque segment généré et chaque option de choix d'action doivent maintenir un ton exceptionnellement apaisant et propice au sommeil. Bannis tout élément de suspense, de peur, d'action rapide, de bruits forts ou tout ce qui pourrait surstimuler un enfant. Concentre-toi sur une imagerie douce, des sons feutrés, un rythme lent et des dénouements paisibles. Utilise un vocabulaire simple, positif et doux. Toutes tes réponses doivent être en français. Ne JAMAIS inclure de démarques (comme \`\`\`json) autour de ta réponse JSON. La réponse doit être un objet JSON valide qui respecte le schéma.`;

const storyPartSchema = {
  type: Type.OBJECT,
  properties: {
    storySegment: {
      type: Type.STRING,
      description: "Un court paragraphe de 3-5 phrases qui continue l'histoire de manière douce et apaisante.",
    },
    question: {
      type: Type.STRING,
      description: "Une question simple pour l'enfant, lui demandant ce que le personnage principal fait ensuite.",
    },
    choices: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Quatre options d'actions très calmes et pertinentes pour le personnage principal. Chaque choix doit être une phrase courte et simple.",
    },
  },
  required: ['storySegment', 'question', 'choices'],
};

const getJsonResponse = <T,>(response: GenerateContentResponse): T => {
    const text = response.text.trim();
    try {
        return JSON.parse(text) as T;
    } catch (e) {
        console.error("Failed to parse JSON:", text);
        throw new Error("La réponse de l'IA n'était pas dans un format attendu.");
    }
};

export const getInitialStoryPart = async (theme: Theme): Promise<StoryPart> => {
    const prompt = `Crée le tout premier segment d'une histoire pour s'endormir sur le thème "${theme.title}". ${theme.prompt}. Commence l'histoire en présentant le personnage dans un cadre calme, juste avant de proposer le premier choix.`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            systemInstruction: baseSystemInstruction,
            responseMimeType: "application/json",
            responseSchema: storyPartSchema,
        }
    });

    return getJsonResponse<StoryPart>(response);
};

export const getNextStoryPart = async (history: StoryHistoryEntry[], theme: Theme): Promise<StoryPart> => {
    const historyString = history
        .map(entry => `${entry.storySegment}\nL'enfant a choisi: "${entry.userChoice}"`)
        .join('\n\n');
    
    const lastChoice = history[history.length-1].userChoice;

    const prompt = `Voici le début d'une histoire sur le thème "${theme.title}" avec le personnage de ${theme.prompt} : \n\n${historyString}\n\nLe dernier choix de l'enfant était : "${lastChoice}".\n\nContinue l'histoire avec un nouveau paragraphe apaisant qui découle de ce choix, puis pose une nouvelle question avec quatre nouveaux choix très calmes.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            systemInstruction: baseSystemInstruction,
            responseMimeType: "application/json",
            responseSchema: storyPartSchema,
        }
    });

    return getJsonResponse<StoryPart>(response);
};

export const getFinalConclusion = async (history: StoryHistoryEntry[]): Promise<string> => {
    const historyString = history
        .map(entry => `${entry.storySegment}\n${entry.userChoice}`)
        .join('\n\n');
    
    const prompt = `Voici l'histoire complète créée par un enfant : \n\n${historyString}\n\nÉcris une conclusion très courte (3-4 phrases) et extrêmement apaisante qui termine l'histoire en douceur, laissant l'enfant dans un état de tranquillité prêt à dormir.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            systemInstruction: baseSystemInstruction,
        }
    });
    
    return response.text;
};
