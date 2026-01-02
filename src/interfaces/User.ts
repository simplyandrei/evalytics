export interface Score {
    id: number;
    score: number;
    totalScore: number;
    label: string;
}

export interface Tab {
    id: number;
    name: string;
    weight: number;
    scores: Score[];
}