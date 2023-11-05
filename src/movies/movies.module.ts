import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {MoviesService} from "./movies.service";
import {MoviesController} from './movies.controller';
import {TmdbService} from './tmdb/tmdb.service';
import {MovieSchema} from "./schemas/movie.schema";
import {MovieDetailsSchema} from "./schemas/movie-details.schema";
import { MoviesResolver } from './movies.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Movie', schema: MovieSchema}]),
        MongooseModule.forFeature([{name: 'MovieDetail', schema: MovieDetailsSchema}]),
    ],
    controllers: [
        MoviesController,
    ],
    providers: [
        MoviesService,
        TmdbService,
        MoviesResolver,
    ],
})


export class MoviesModule {
}
