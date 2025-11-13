export type View = 'deals' | 'sharks' | 'insights';

export interface Ask {
    equity: number;
    amount: number;
    valuation: number;
}

export interface Deal {
    investors: string[];
    equity: number;
    amount: number;
    valuation: number;
}

export interface Brand {
    id: number;
    name: string;
    founders: string[];
    season: number;
    episode: number;
    category: string;
    description: string;
    ask: Ask;
    deal: Deal | null;
    productUrl: string;
    logoUrl?: string;
}

export interface Shark {
    id: number;
    name: string;
    imageChar: string;
    bio: string;
    imageUrl: string;
}
