import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

@Schema()
export class Movie {
    @Prop({type: String})
    @ApiProperty({type: String})
    id: string;

    @Prop({type: Boolean})
    @ApiProperty({type: Boolean})
    adult: boolean;

    @Prop({type: String})
    @ApiProperty({type: String})
    poster_path: string;

    @Prop({type: String})
    @ApiProperty({type: String})
    backdrop_path: string;

    @Prop({type: String})
    @ApiProperty({type: String})
    original_language: string;

    @Prop({type: String})
    @ApiProperty({type: String})
    overview: string;

    @Prop({type: Number})
    @ApiProperty({type: Number})
    popularity: number;

    @Prop({type: Number})
    @ApiProperty({type: Number})
    vote_average: number;

    @Prop({type: Number})
    @ApiProperty({type: Number})
    vote_count: number;

    @Prop({type: Boolean})
    @ApiProperty({type: Boolean})
    video: boolean;

    @Prop({type: String})
    @ApiProperty({type: String})
    release_date: string;

    @Prop({type: [Number]})
    @ApiProperty({type: [Number]})
    genre_ids: number[];

    @Prop({required: true, type: String})
    title: string;
}

export type MovieDocument = Movie & Document;
export const MovieSchema = SchemaFactory.createForClass(Movie);
