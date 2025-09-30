// Importez les bibliothèques nécessaires
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
    // Ne traitez que les requêtes POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { theme, storyContext, step, choice } = JSON.parse(event.body);

        // Récupérez votre clé API depuis les variables d'environnement de Netlify (TRÈS IMPORTANT !)
        const API_KEY = process.env.GEMINI_API_KEY;
        if (!API_KEY) {
            throw new Error("Clé API Gemini non configurée dans les variables d'environnement Netlify.");
        }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Ou "gemini-1.5-pro-latest" si disponible et voulu

        let prompt = "";
        let currentStory = storyContext || "";

        // Adaptez les prompts ici en fonction de la progression de l'histoire
        // C'est ici que vous insérez la logique de votre prompt AI Studio !
        if (step === 0) {
            // Prompt initial basé sur le thème
            prompt = `Crée le début très apaisant d'une courte histoire pour enfant (3-5 phrases) sur le thème "${theme}". Introduis un personnage principal doux et calme. Le but est d'aider à s'endormir. Ne propose pas encore de choix.`;
        } else if (step > 0 && choice) {
            // Prompt pour la suite de l'histoire basée sur le choix de l'action du personnage
            prompt = `Continue l'histoire suivante en intégrant l'action choisie : "${currentStory}"\n\nLe personnage fait l'action suivante : "${choice}". Développe cette action calmement en 3-5 phrases. Ensuite, propose 4 nouvelles actions très calmes et propices au sommeil pour le personnage, formatées comme une liste numérotée (1. Action 1, 2. Action 2, etc.). Les actions doivent être douces et continuer à aider à l'endormissement.`;
        } else {
             // Fallback ou erreur si un choix est manquant après la première étape
            prompt = `Continue l'histoire suivante calmement en 3-5 phrases : "${currentStory}". Propose 4 nouvelles actions très calmes et propices au sommeil pour le personnage, formatées comme une liste numérotée (1. Action 1, 2. Action 2, etc.).`;
        }


        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();

        // Extrait la partie histoire et les choix si des choix sont proposés
        let storyPart = generatedText;
        let choices = [];

        const choiceRegex = /\d+\.\s(.+)/g; // Regex pour trouver les choix numérotés
        const matches = generatedText.match(choiceRegex);

        if (matches) {
            storyPart = generatedText.substring(0, generatedText.indexOf(matches[0])).trim();
            choices = matches.map(m => m.replace(/^\d+\.\s/, '').trim());
        }
        
        // Si c'est la dernière étape, ne pas proposer de choix, juste la fin de l'histoire
        if (step >= MAX_STEPS -1) { // MAX_STEPS est défini côté client, mais on peut le recoder ici ou l'envoyer
            storyPart = generatedText; // La dernière partie n'aura pas de choix
            choices = []; // Plus de choix après la dernière étape
        }


        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ storyPart: storyPart, choices: choices }),
        };

    } catch (error) {
        console.error("Erreur lors de la génération de contenu:", error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: error.message || "Erreur interne du serveur." }),
        };
    }
};
