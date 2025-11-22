export type WordItem = {
    id: string;
    text: string;
    context?: string;
    level: 1 | 2 | 3;
    hint?: string; // New field for pedagogical help
};

export const words: WordItem[] = [
    // --- NIVEAU 1 : BASES & SONS SIMPLES ---
    { id: '1', text: 'vert', context: 'La couleur de l\'herbe est vert.', level: 1, hint: 'Pense au féminin "verte".' },
    { id: '2', text: 'mer', context: 'Je nage dans la mer.', level: 1 },
    { id: '3', text: 'chat', context: 'Le chat dort sur le canapé.', level: 1, hint: 'Le féminin est "chatte".' },
    { id: '4', text: 'chien', context: 'Le chien aboie fort.', level: 1 },
    { id: '5', text: 'table', context: 'Le livre est sur la table.', level: 1 },
    { id: '6', text: 'soleil', context: 'Le soleil brille aujourd\'hui.', level: 1, hint: 'Attention à la fin en "eil".' },
    { id: '7', text: 'lune', context: 'La lune éclaire la nuit.', level: 1 },
    { id: '8', text: 'porte', context: 'Ferme la porte s\'il te plaît.', level: 1 },
    { id: '9', text: 'rouge', context: 'Ma voiture est rouge.', level: 1 },
    { id: '10', text: 'bleu', context: 'Le ciel est bleu.', level: 1 },
    { id: '11', text: 'maman', context: 'J\'aime ma maman.', level: 1 },
    { id: '12', text: 'papa', context: 'Papa rentre du travail.', level: 1 },
    { id: '13', text: 'école', context: 'Je vais à l\'école en bus.', level: 1 },
    { id: '14', text: 'livre', context: 'Je lis un livre passionnant.', level: 1 },
    { id: '15', text: 'stylo', context: 'Prête-moi ton stylo.', level: 1 },

    // --- NIVEAU 2 : DOUBLES CONSONNES & ACCENTS ---
    { id: '16', text: 'verre', context: 'Je bois de l\'eau dans un verre.', level: 2, hint: 'Double "r" pour boire.' },
    { id: '17', text: 'terre', context: 'Les vers de terre sont utiles.', level: 2, hint: 'La planète Terre prend deux "r".' },
    { id: '18', text: 'appeler', context: 'Je vais appeler mon ami.', level: 2, hint: 'Deux "p", un seul "l" à l\'infinitif.' },
    { id: '19', text: 'forêt', context: 'Nous marchons dans la forêt.', level: 2, hint: 'N\'oublie pas l\'accent circonflexe sur le e.' },
    { id: '20', text: 'château', context: 'Le roi vit dans un château.', level: 2, hint: 'Accent circonflexe sur le a.' },
    { id: '21', text: 'bientôt', context: 'Je reviens bientôt.', level: 2, hint: 'Accent circonflexe sur le o.' },
    { id: '22', text: 'garçon', context: 'Le garçon joue au ballon.', level: 2, hint: 'N\'oublie pas la cédille.' },
    { id: '23', text: 'leçon', context: 'J\'apprends ma leçon.', level: 2, hint: 'Ç comme dans "garçon".' },
    { id: '24', text: 'pomme', context: 'Je mange une pomme.', level: 2, hint: 'Double "m".' },
    { id: '25', text: 'gomme', context: 'J\'efface avec ma gomme.', level: 2, hint: 'Double "m".' },
    { id: '26', text: 'ballon', context: 'Il lance le ballon.', level: 2, hint: 'Double "l".' },
    { id: '27', text: 'famille', context: 'J\'aime ma famille.', level: 2, hint: 'Double "l" pour le son "ille".' },
    { id: '28', text: 'fille', context: 'C\'est une petite fille.', level: 2, hint: 'Double "l".' },
    { id: '29', text: 'soleil', context: 'Le soleil chauffe la plage.', level: 2 },
    { id: '30', text: 'travail', context: 'Il a beaucoup de travail.', level: 2, hint: 'Fin en "ail".' },

    // --- NIVEAU 3 : PIÈGES, HOMOPHONES & EXCEPTIONS ---
    { id: '31', text: 'orthographe', context: 'Il faut soigner son orthographe.', level: 3, hint: 'Th au début, ph à la fin.' },
    { id: '32', text: 'aujourd\'hui', context: 'Aujourd\'hui, il fait beau.', level: 3, hint: 'N\'oublie pas l\'apostrophe.' },
    { id: '33', text: 'développement', context: 'Le développement web est un métier d\'avenir.', level: 3, hint: 'Deux "p", un seul "l", deux "m".' },
    { id: '34', text: 'accueil', context: 'L\'accueil est ouvert 24h/24.', level: 3, hint: 'Le u vient après le c.' },
    { id: '35', text: 'piscine', context: 'Je vais à la piscine.', level: 3, hint: 'Sc pour le son "s".' },
    { id: '36', text: 'science', context: 'La science explique le monde.', level: 3, hint: 'Sc au début.' },
    { id: '37', text: 'théâtre', context: 'Nous allons au théâtre.', level: 3, hint: 'Th au début, accent circonflexe sur le a.' },
    { id: '38', text: 'rhume', context: 'J\'ai attrapé un rhume.', level: 3, hint: 'Rh au début.' },
    { id: '39', text: 'pharmacie', context: 'Je vais à la pharmacie.', level: 3, hint: 'Ph pour le son "f".' },
    { id: '40', text: 'photo', context: 'Je prends une photo.', level: 3, hint: 'Ph pour le son "f".' },
    { id: '41', text: 'éléphant', context: 'L\'éléphant est énorme.', level: 3, hint: 'Ph pour le son "f".' },
    { id: '42', text: 'temps', context: 'Le temps passe vite.', level: 3, hint: 'Lettres muettes m, p et s.' },
    { id: '43', text: 'printemps', context: 'Les fleurs sortent au printemps.', level: 3, hint: 'Comme "temps".' },
    { id: '44', text: 'blanc', context: 'Le mur est blanc.', level: 3, hint: 'Féminin "blanche".' },
    { id: '45', text: 'franc', context: 'Il est très franc avec moi.', level: 3, hint: 'Féminin "franche".' },
    { id: '46', text: 'doigt', context: 'Je me suis coupé le doigt.', level: 3, hint: 'G et t sont muets.' },
    { id: '47', text: 'vingt', context: 'J\'ai vingt ans.', level: 3, hint: 'G et t sont muets.' },
    { id: '48', text: 'compter', context: 'Je sais compter jusqu\'à cent.', level: 3, hint: 'M et p avant le t.' },
    { id: '49', text: 'sculpture', context: 'Cette sculpture est belle.', level: 3, hint: 'Le p s\'entend à peine.' },
    { id: '50', text: 'automne', context: 'Les feuilles tombent en automne.', level: 3, hint: 'M et n à la fin.' },
];
