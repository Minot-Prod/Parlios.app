
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GameState, NarrationState } from './types';
import type { Theme, StoryPart, StoryHistoryEntry } from './types';
import { STORY_THEMES, STORY_ITERATIONS, MUSIC_URL } from './constants';
import * as GeminiService from './services/geminiService';
import WelcomeScreen from './components/WelcomeScreen';
import ThemeSelector from './components/ThemeSelector';
import StoryGenerator from './components/StoryGenerator';
import StoryDisplay from './components/StoryDisplay';
import Loader from './components/Loader';

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(GameState.WELCOME);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
    const [storyHistory, setStoryHistory] = useState<StoryHistoryEntry[]>([]);
    const [currentStoryPart, setCurrentStoryPart] = useState<StoryPart | null>(null);
    const [finalStory, setFinalStory] = useState<string>('');

    const [narrationState, setNarrationState] = useState<NarrationState>(NarrationState.IDLE);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
        return () => {
            window.speechSynthesis.onvoiceschanged = null;
            // Ensure any ongoing speech is stopped on unmount
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handleError = (message: string) => {
        setError(message);
        setIsLoading(false);
    };

    const handleStart = () => {
        setGameState(GameState.THEME_SELECTION);
        if (audioRef.current) {
            audioRef.current.volume = 0;
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            let vol = 0;
            const interval = setInterval(() => {
                vol = Math.min(vol + 0.05, 0.15); // Target low volume
                if (audioRef.current) {
                    audioRef.current.volume = vol;
                }
                if (vol >= 0.15) {
                    clearInterval(interval);
                }
            }, 100);
        }
    };

    const handleThemeSelect = useCallback(async (theme: Theme) => {
        setIsLoading(true);
        setError(null);
        setSelectedTheme(theme);
        try {
            const initialPart = await GeminiService.getInitialStoryPart(theme);
            setCurrentStoryPart(initialPart);
            setGameState(GameState.STORY_GENERATION);
        } catch (err) {
            console.error(err);
            handleError("Désolé, une erreur est survenue lors de la création de l'histoire. Veuillez réessayer.");
            setGameState(GameState.THEME_SELECTION);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleChoiceSelect = useCallback(async (choice: string) => {
        if (!currentStoryPart) return;

        setIsLoading(true);
        setError(null);
        
        const newHistoryEntry: StoryHistoryEntry = {
            storySegment: currentStoryPart.storySegment,
            userChoice: choice,
        };
        const updatedHistory = [...storyHistory, newHistoryEntry];
        setStoryHistory(updatedHistory);
        setCurrentStoryPart(null); // Clear current part while loading next

        try {
            if (updatedHistory.length < STORY_ITERATIONS) {
                const nextPart = await GeminiService.getNextStoryPart(updatedHistory, selectedTheme!);
                setCurrentStoryPart(nextPart);
            } else {
                const conclusion = await GeminiService.getFinalConclusion(updatedHistory);
                const fullStory = updatedHistory.map(h => `${h.storySegment}\n\n${h.userChoice}`).join('\n\n') + `\n\n${conclusion}`;
                setFinalStory(fullStory);
                setGameState(GameState.STORY_COMPLETE);
            }
        } catch (err) {
            console.error(err);
            handleError("Oh non, la magie semble s'être estompée un instant. Réessayons.");
            // Revert state to allow user to retry
            setStoryHistory(storyHistory);
            setCurrentStoryPart(currentStoryPart);
        } finally {
            setIsLoading(false);
        }
    }, [currentStoryPart, storyHistory, selectedTheme]);
    
    const handleRestart = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        setGameState(GameState.THEME_SELECTION);
        setSelectedTheme(null);
        setStoryHistory([]);
        setCurrentStoryPart(null);
        setFinalStory('');
        setError(null);
        setNarrationState(NarrationState.IDLE);
    };

    const playNarration = useCallback(() => {
        if (narrationState === NarrationState.PAUSED && utteranceRef.current) {
            window.speechSynthesis.resume();
            setNarrationState(NarrationState.PLAYING);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(finalStory);
        const frenchVoice = voices.find(v => v.lang === 'fr-FR' && v.name.includes('Female')) || voices.find(v => v.lang === 'fr-FR');
        
        utterance.voice = frenchVoice || null;
        utterance.lang = 'fr-FR';
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onstart = () => setNarrationState(NarrationState.PLAYING);
        utterance.onpause = () => setNarrationState(NarrationState.PAUSED);
        utterance.onresume = () => setNarrationState(NarrationState.PLAYING);
        utterance.onend = () => setNarrationState(NarrationState.IDLE);
        
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, [finalStory, voices, narrationState]);

    const pauseNarration = () => {
        window.speechSynthesis.pause();
    };

    const stopNarration = () => {
        window.speechSynthesis.cancel();
        setNarrationState(NarrationState.IDLE);
    };


    const renderContent = () => {
        if (error) {
            return (
                <div className="text-center p-8 animate-fade-in">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Oups !</h2>
                    <p className="mb-6">{error}</p>
                    <button onClick={handleRestart} className="bg-calm-indigo hover:bg-soft-purple text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Recommencer
                    </button>
                </div>
            );
        }
        
        if (isLoading && gameState !== GameState.THEME_SELECTION) {
             return <Loader message="La magie opère..." />;
        }

        switch (gameState) {
            case GameState.WELCOME:
                return <WelcomeScreen onStart={handleStart} />;
            case GameState.THEME_SELECTION:
                return <ThemeSelector themes={STORY_THEMES} onSelect={handleThemeSelect} isLoading={isLoading} />;
            case GameState.STORY_GENERATION:
                if (currentStoryPart) {
                   return <StoryGenerator part={currentStoryPart} onSelect={handleChoiceSelect} historyCount={storyHistory.length + 1} totalCount={STORY_ITERATIONS} />;
                }
                return <Loader message="Un instant, la suite arrive..." />;
            case GameState.STORY_COMPLETE:
                return <StoryDisplay 
                    story={finalStory} 
                    narrationState={narrationState}
                    onPlay={playNarration}
                    onPause={pauseNarration}
                    onStop={stopNarration}
                    onRestart={handleRestart}
                />;
            default:
                return <WelcomeScreen onStart={handleStart} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-deep-slate to-slate-800 -z-10"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-soft-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-calm-indigo rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>

            <main className="w-full max-w-4xl mx-auto z-10">
                {renderContent()}
            </main>
            <audio ref={audioRef} src={MUSIC_URL} loop />
        </div>
    );
};

export default App;
