import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

@Schema()
export class MovieDetail {
    @Prop({type: String})
    @ApiProperty({type: String})
    id: string;

    @Prop({type: Boolean})
    @ApiProperty({type: Boolean})
    adult: boolean;

    @Prop([String])
    @ApiProperty({type: [String]})
    belongs_to_collection: any;

    @Prop({type: String})
    @ApiProperty({type: String})
    backdrop_path: string;

    @Prop({type: Number})
    @ApiProperty({type: Number})
    budget: number;

    @Prop({type: String})
    @ApiProperty({type: String})
    homepage: string;

    @Prop({type: String})
    @ApiProperty({type: String})
    imdb_id: string;

    @Prop({type: String})
    @ApiProperty({type: String})
    original_language: string;

    @Prop({type: String})
    @ApiProperty({type: String})
    original_title: string;

    @Prop({type: String})
    @ApiProperty({type: String})
    overview: string;

    @Prop({type: Number})
    @ApiProperty({type: Number})
    popularity: number;

    @Prop({type: String})
    @ApiProperty({type: String})
    poster_path: string;

    @Prop([String])
    @ApiProperty({type: [String]})
    production_companies: any;

    @Prop([String])
    @ApiProperty({type: [String]})
    production_countries: any;

    @Prop({type: String})
    @ApiProperty({type: String})
    release_date: string;

    @Prop({type: Number})
    @ApiProperty({type: Number})
    revenue: number;

    @Prop({type: Number})
    @ApiProperty({type: Number})
    runtime: number;

    @Prop([String])
    @ApiProperty({type: [String]})
    spoken_languages: any;

    @Prop({type: String})
    @ApiProperty({type: String})
    status: string;

    @Prop({type: String})
    @ApiProperty({type: String})
    tagline: string;

    @Prop({type: String})
    @ApiProperty({type: String})
    title: string;

    @Prop({type: Boolean})
    @ApiProperty({type: Boolean})
    video: boolean;

    @Prop({type: Number})
    @ApiProperty({type: Number})
    vote_average: number;

    @Prop({type: Number})
    vote_count: number;

    @Prop([Object])
    @ApiProperty({type: [Object]})
    genres: [{ id: number, name: string }]

}

export type MovieDetailDocument = MovieDetail & Document;
export const MovieDetailSchema = SchemaFactory.createForClass(MovieDetail);
