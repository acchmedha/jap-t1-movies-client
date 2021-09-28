import { Actor } from "./actor.model";

export interface Video {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: Date;
    overview: string;
    averageRating: number;
    actors: Actor[];
    type: number;
}