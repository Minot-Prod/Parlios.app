
import React from 'react';

const iconProps = {
  className: "h-12 w-12",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.5
};

export const ForestIcon = () => (
  <svg {...iconProps} >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-1.07-1.07m1.07 1.07l1.07 1.07m0 0l-1.07 1.07m-15.482-4.28a50.69 50.69 0 01-1.632-1.632" />
  </svg>
);

export const CloudIcon = () => (
  <svg {...iconProps} >
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z" />
  </svg>
);

export const GardenIcon = () => (
  <svg {...iconProps} >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.584a.563.563 0 01.321.988l-4.204 3.055a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-3.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.055a.563.563 0 01.321-.988h5.584a.563.563 0 00.475-.345L11.48 3.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 21a2 2 0 002-2v-1a2 2 0 00-2-2H6a2 2 0 00-2 2v1a2 2 0 002 2h12z" />
  </svg>
);

export const WaterDropIcon = () => (
  <svg {...iconProps} >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013-3.815A8.98 8.98 0 0012 3c1.392 0 2.7.422 3.75.962a8.98 8.98 0 01-1.424 1.252z" />
  </svg>
);

export const StarsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12l.813-2.846a4.5 4.5 0 00-3.09-3.09L13.125 5.25l-.813 2.846a4.5 4.5 0 00-3.09 3.09L6.375 12l2.846.813a4.5 4.5 0 003.09 3.09L13.125 18.75l.813-2.846a4.5 4.5 0 003.09-3.09L19.75 12l-1.5-.424z" />
    </svg>
);

const controlIconProps = {
    className: "h-6 w-6",
    fill: "currentColor",
    viewBox: "0 0 24 24"
};

export const PlayIcon = () => (
    <svg {...controlIconProps} xmlns="http://www.w3.org/2000/svg"><path d="M7 6v12l10-6z"></path></svg>
);

export const PauseIcon = () => (
    <svg {...controlIconProps} xmlns="http://www.w3.org/2000/svg"><path d="M6 18h4V6H6v12zm8-12v12h4V6h-4z"></path></svg>
);

export const StopIcon = () => (
    <svg {...controlIconProps} xmlns="http://www.w3.org/2000/svg"><path d="M6 6h12v12H6z"></path></svg>
);

export const RestartIcon = () => (
    <svg {...controlIconProps} xmlns="http://www.w3.org/2000/svg"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path></svg>
);
