import { Battler } from '.';

export interface Monster extends Battler {
    description: string;
    index: number;
}
