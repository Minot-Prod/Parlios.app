const themeSelectionScreen = document.getElementById('theme-selection');
const storyProgressScreen = document.getElementById('story-progress');
const finalStoryScreen = document.getElementById('final-story');
const storyTextElement = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const fullStoryTextElement = document.getElementById('full-story-text');
const readAloudButton = document.getElementById('read-aloud-button');
const backgroundMusic = document.getElementById('background-music');

let currentStory = "";
let currentStep = 0;
let selectedTheme = "";
const MAX_STEPS = 4; // Ajustez si vous voulez 5 questions (MAX_STEPS = 5)

// Assure que la musique démarre au chargement
window.addEventListener('load', () => {
    backgroundMusic.volume = 0.3; // Volume doux
    backgroundMusic.play().catch(e => console.log("Musique autoplay bloquée, l'utilisateur devra interagir."));
});

// Étape 1: Sélection du thème
document.querySelectorAll('.theme-button').forEach(button => {
    button.addEventListener('click', (e) => {
        selectedTheme = e.target.dataset.theme;
        startStoryGeneration(selectedTheme);
        themeSelectionScreen.classList.remove('active');
        storyProgressScreen.classList.add('active');
    });
});

// Fonction pour demander la génération de l'histoire à notre Netlify Function
async function callGeminiFunction(context, currentStep, userChoice = null) {
    try {
        const response = await fetch('/.netlify/functions/generate-story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                theme: selectedTheme,
                storyContext: context,
                step: currentStep,
                choice: userChoice // Envoyer le choix de l'utilisateur
            }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            console.error("Erreur de l'API:", data.error);
            storyTextElement.textContent = "Oups, une petite erreur est survenue. Réessayez plus tard.";
            return null;
        }
    } catch (error) {
        console.error("Erreur de connexion à la fonction Netlify:", error);
        storyTextElement.textContent = "Problème de connexion. Vérifiez votre connexion internet.";
        return null;
    }
}

async function startStoryGeneration(theme) {
    currentStep = 0;
    currentStory = "";
    storyTextElement.textContent = "Création de l'histoire...";
    choicesContainer.innerHTML = '';

    const result = await callGeminiFunction(currentStory, currentStep);
    if (result) {
        currentStory = result.storyPart;
        storyTextElement.textContent = currentStory;
        displayChoices(result.choices);
    }
}

async function handleChoice(choice) {
    currentStep++;
    storyTextElement.textContent = currentStory + "\n\nSuite de l'histoire..."; // Indicateur de chargement
    choicesContainer.innerHTML = ''; // Cacher les choix précédents

    if (currentStep <= MAX_STEPS) {
        const result = await callGeminiFunction(currentStory, currentStep, choice);
        if (result) {
            currentStory += "\n\n" + result.storyPart;
            storyTextElement.textContent = currentStory;
            if (currentStep < MAX_STEPS) {
                displayChoices(result.choices);
            } else {
                // C'est la dernière étape, on va à la conclusion
                finalizeStory();
            }
        }
    } else {
        finalizeStory();
    }
}

function displayChoices(choices) {
    choicesContainer.innerHTML = ''; // Nettoyer les anciens choix
    if (choices && choices.length > 0) {
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', () => handleChoice(choice));
            choicesContainer.appendChild(button);
        });
    } else {
        // Si pas de choix, on passe à la conclusion
        finalizeStory();
    }
}

async function finalizeStory() {
    storyProgressScreen.classList.remove('active');
    finalStoryScreen.classList.add('active');
    fullStoryTextElement.textContent = currentStory;

    // Optionnel: Baisser le volume de la musique pendant la lecture vocale
    readAloudButton.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(currentStory);
            utterance.lang = 'fr-FR'; // Langue française
            utterance.volume = 1; // Ajuster si la musique est trop forte
            utterance.rate = 0.8; // Vitesse de lecture (plus lent pour le sommeil)
            utterance.pitch = 1; // Hauteur de la voix

            utterance.onstart = () => { backgroundMusic.volume = 0.1; }; // Baisser la musique
            utterance.onend = () => { backgroundMusic.volume = 0.3; }; // Remonter la musique

            window.speechSynthesis.speak(utterance);
        } else {
            alert("Votre navigateur ne supporte pas la lecture vocale.");
        }
    });
}
