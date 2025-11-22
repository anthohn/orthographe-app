export type WordItem = {
    id: string;
    text: string;
    context?: string;
    level: 1 | 2 | 3;
};

export const words: WordItem[] = [
    // Niveau 1 : Mots simples / Sons de base
    { id: '1', text: 'vert', context: 'La couleur de l\'herbe est vert.', level: 1 },
    { id: '2', text: 'mer', context: 'Je nage dans la mer.', level: 1 },
    { id: '3', text: 'chat', context: 'Le chat dort sur le canapé.', level: 1 },

    // Niveau 2 : Doubles consonnes / Accents / Sons complexes
    { id: '4', text: 'verre', context: 'Je bois de l\'eau dans un verre.', level: 2 },
    { id: '5', text: 'terre', context: 'Les vers de terre sont utiles.', level: 2 },
    { id: '6', text: 'appeler', context: 'Je vais appeler mon ami.', level: 2 },
    { id: '7', text: 'forêt', context: 'Nous marchons dans la forêt.', level: 2 },

    // Niveau 3 : Pièges / Mots invariables / Exceptions
    { id: '8', text: 'orthographe', context: 'Il faut soigner son orthographe.', level: 3 },
    { id: '9', text: 'aujourd\'hui', context: 'Aujourd\'hui, il fait beau.', level: 3 },
    { id: '10', text: 'développement', context: 'Le développement web est un métier d\'avenir.', level: 3 },
    { id: '11', text: 'accueil', context: 'L\'accueil est ouvert 24h/24.', level: 3 },
];
