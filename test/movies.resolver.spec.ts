import {Test, TestingModule} from '@nestjs/testing';
import {MoviesResolver} from '../src/movies/movies.resolver';
import {MoviesService} from "../src/movies/movies.service";
import {Movie} from "../src/movies/entity/movie.entity";
import {getModelToken} from "@nestjs/mongoose";
import {TmdbService} from "../src/movies/tmdb/tmdb.service";

describe('MoviesResolver', () => {
    let resolver: MoviesResolver;
    let service: MoviesService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesResolver, MoviesService, TmdbService, {
                provide: getModelToken('Movie'),
                useValue: {}
            }, {
                provide: getModelToken('MovieDetail'),
                useValue: {}
            }],
        }).compile();

        resolver = module.get<MoviesResolver>(MoviesResolver);
        service = module.get<MoviesService>(MoviesService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should find a movie by ID', async () => {
        const movieId = '123';
        const movie: Movie = {
            id: movieId,
            title: 'Removed Movie',
            adult: false,
            poster_path: 'poster_path',
            backdrop_path: 'backdrop_path',
            original_language: 'original_language',
            overview: 'overview',
            popularity: 1,
            vote_average: 1,
            vote_count: 1,
            video: false,
            release_date: 'release_date',
            genre_ids: [1, 2, 3]
        };

        jest.spyOn(service, 'findById').mockImplementation(async (id) => movie);

        const result = await resolver.findById(movieId);

        expect(result).toEqual(movie);
    });
});
