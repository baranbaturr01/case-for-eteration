import {ObjectType, Field} from '@nestjs/graphql';

@ObjectType()
export class Movie {
    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    adult: boolean;

    @Field()
    poster_path: string;

    @Field()
    backdrop_path: string;

    @Field()
    original_language: string;

    @Field()
    overview: string;

    @Field()
    popularity: number;

    @Field()
    vote_average: number;

    @Field()
    vote_count: number;

    @Field()
    video: boolean;

    @Field()
    release_date: string;

    @Field(type => [Number])
    genre_ids: number[];

}
