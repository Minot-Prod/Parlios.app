
import React from 'react';
import type { Theme } from './types';
import { ForestIcon, CloudIcon, GardenIcon, WaterDropIcon } from './components/icons';

export const STORY_THEMES: Theme[] = [
  {
    id: 'forest',
    title: 'La Forêt des Rêves Endormis',
    description: 'Explorez une forêt douce où les animaux se préparent à dormir.',
    icon: <ForestIcon />,
    prompt: "Le personnage principal est un petit renardeau curieux et doux, nommé Flocon.",
  },
  {
    id: 'cloud',
    title: 'Le Voyage du Nuage Douillet',
    description: 'Flottez paisiblement dans le ciel sur un nuage moelleux.',
    icon: <CloudIcon />,
    prompt: "Le personnage principal est un petit nuage moelleux, nommé Céleste, qui aime voyager lentement dans le ciel.",
  },
  {
    id: 'garden',
    title: 'Le Jardin Secret de la Nuit',
    description: "Découvrez la magie d'un jardin qui s'éveille la nuit.",
    icon: <GardenIcon />,
    prompt: "Le personnage principal est une petite luciole lumineuse, nommée Lumi, qui explore un jardin secret la nuit.",
  },
  {
    id: 'water',
    title: "L'Aventure de la Petite Goutte d'Eau",
    description: "Suivez le parcours calme d'une goutte d'eau.",
    icon: <WaterDropIcon />,
    prompt: "Le personnage principal est une petite goutte d'eau scintillante, nommée Perle, qui commence un voyage tranquille.",
  },
];

export const STORY_ITERATIONS = 4; // 4 choices will lead to 5 segments + conclusion
export const MUSIC_URL = 'https://assets.mixkit.co/music/preview/mixkit-a-dream-within-a-dream-410.mp3';
