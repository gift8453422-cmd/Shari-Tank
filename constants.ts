import { SHARKS_DATA } from './data/sharks.ts';

export const CHART_COLORS = ['#8a63d2', '#34d399', '#f87171', '#facc15', '#9ca3af', '#c084fc', '#fb923c'];

export const sharkInfoMap = new Map(SHARKS_DATA.map(shark => [shark.name, shark]));