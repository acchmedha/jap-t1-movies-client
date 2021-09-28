import { Actor } from "./actor.model";
import { VideoEnum } from "./videoEnum";

export interface Video {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: Date;
    overview: string;
    averageRating: number;
    actors: Actor[];
    type: 0;
}