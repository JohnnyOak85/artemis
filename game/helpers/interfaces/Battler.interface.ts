export interface Battler {
    attack: number;
    boost?: number;
    damage?: number;
    defense: number;
    health: number;
    id: string;
    level: number;
    luck: number;
    originalHealth?: number;
    type?: string;
}
