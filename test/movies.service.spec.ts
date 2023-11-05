import {Test, TestingModule} from '@nestjs/testing';
import {MoviesService} from '../src/movies/movies.service';
import {Model} from "mongoose";
import {MovieDocument} from "../src/movies/entity/movie.entity";
import {getModelToken} from "@nestjs/mongoose";
import {TmdbService} from "../src/movies/tmdb/tmdb.service";

describe('MoviesService', () => {
    let service: MoviesService;
    let movieModel: Model<MovieDocument>

    const mockTmdbService = {
        fetchMovies: jest.fn(),
        fetchMovieDetailsFromTmdb: jest.fn(),
    }
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MoviesService,
                {
                    provide: getModelToken('Movie'),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        findByIdAndRemove: jest.fn(),
                        insertMany: jest.fn(),
                    },
                },
                {
                    provide: getModelToken('MovieDetail'),
                    useValue: {
                        create: jest.fn(),
                    },
                },
                {
                    provide: TmdbService,
                    useValue: mockTmdbService,
                },
            ],
        }).compile();

        service = module.get<MoviesService>(MoviesService);
        movieModel = module.get<Model<MovieDocument>>(getModelToken('Movie'));
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('saveMoviesToDatabase', () => {
        it('should fetch and save movies to the database', async () => {
            const moviesToSave = [{
                id: '1',
                title: 'New Movie',
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
            }];
            const saveResult = [{
                "id": "1181748",
                "title": "Felix Nadar Spinning in his Chair",
                "adult": false,
                "backdrop_path": null,
                "original_language": "en",
                "overview": "Revolving portrait of French photographer Felix Nadar.",
                "popularity": 0.659,
                "vote_average": 5.5,
                "vote_count": 2,
                "video": false,
                "release_date": "1865-01-01",
                "genre_ids": [
                    99
                ],
                "_id": "6547cd020c74245a88c5348e",
                "__v": 0,
                "createdAt": "2023-11-05T17:12:34.553Z",
                "updatedAt": "2023-11-05T17:12:34.553Z"
            }];

            mockTmdbService.fetchMovies = jest.fn().mockResolvedValue(moviesToSave);
            movieModel.insertMany = jest.fn().mockResolvedValue(saveResult);

            const result = await service.saveMoviesToDatabase();

            expect(mockTmdbService.fetchMovies).toBeCalledTimes(1);
            expect(movieModel.insertMany).toBeCalledWith(moviesToSave);
            expect(result).toEqual(saveResult);
        });

        it('should handle errors when saving movies', async () => {
            const moviesToSave = [{
                id: '1',
                title: 'New Movie',
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
            }];

            mockTmdbService.fetchMovies.mockResolvedValue(moviesToSave);
            movieModel.insertMany = jest.fn().mockRejectedValue(new Error('Database error'));

            const result = await service.saveMoviesToDatabase();

            expect(mockTmdbService.fetchMovies).toBeCalledTimes(1);
            expect(movieModel.insertMany).toBeCalledWith(moviesToSave);
            expect(result).toEqual({
                success: false,
                message: 'Movies could not be saved to the database',
            });
        });
    });

    describe('findAll', () => {
        it('should return a list of movies', async () => {
            const mockMovies = [{
                id: '1',
                title: 'New Movie',
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
            }];
            movieModel.find = jest.fn().mockReturnValue({exec: jest.fn().mockResolvedValue(mockMovies)});

            const result = await service.findAll();

            expect(movieModel.find).toBeCalledTimes(1);
            expect(result).toEqual(mockMovies);
        });
    });

    describe('findById', () => {
        it('should return a movie by ID', async () => {
            const mockMovie = {
                id: '1',
                title: 'New Movie',
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
            movieModel.findOne = jest.fn().mockResolvedValue(mockMovie);
            const result = await service.findById('1');

            expect(movieModel.findOne).toBeCalledTimes(1);
            expect(result).toEqual(mockMovie);
        });
    });

    describe('create', () => {
        it('should create a new movie', async () => {
            const movieToCreate = {
                id: '1',
                title: 'New Movie',
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
            const createdMovie = {
                ...movieToCreate, "_id": "6547cd020c74245a88c5348e",
                "__v": 0,
                "createdAt": "2023-11-05T17:12:34.553Z",
                "updatedAt": "2023-11-05T17:12:34.553Z"
            };
            movieModel.create = jest.fn().mockResolvedValue(createdMovie);

            const result = await service.create(movieToCreate);

            expect(movieModel.create).toBeCalledTimes(1);
            expect(result).toEqual(createdMovie);
        });
    });

    describe('removeById', () => {
        it('should remove a movie by ID', async () => {
            const mockMovie = {
                id: '1',
                title: 'New Movie',
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
            movieModel.findByIdAndRemove = jest.fn().mockResolvedValue(mockMovie);

            const result = await service.removeById('1');

            expect(movieModel.findByIdAndRemove).toBeCalledTimes(1);
            expect(result).toEqual(mockMovie);
        });
    });

    describe('fetchAndPersistMovieDetails', () => {
        it('should fetch and persist movie details', async () => {
            const movieId = 1181748;
            const tmdbMovieDetails = {
                id: "1",
                title: 'Movie Title',
                belongs_to_collection: 'belongs_to_collection',
                adult: false,
                homepage: 'homepage',
                imdb_id: 'imdb_id',
                budget: 1,
                poster_path: 'poster_path',
                backdrop_path: 'backdrop_path',
                original_language: 'original_language',
                original_title: 'original_title',
                overview: 'overview',
                production_companies: ['production_companies'],
                production_countries: ['production_countries'],
                spoken_languages: ['spoken_languages'],
                status: 'status',
                tagline: 'tagline',
                genres: [{id: 1, name: 'genre_name'}],
                revenue: 1,
                runtime: 1,
                popularity: 1,
                vote_average: 1,
                vote_count: 1,
                video: false,
                release_date: 'release_date',
            };
            const movieDetails = {
                id: '1',
                title: 'New Movie',
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

            mockTmdbService.fetchMovieDetailsFromTmdb.mockResolvedValue(tmdbMovieDetails);
            movieModel.create = jest.fn().mockResolvedValue(movieDetails);

            const result = await service.fetchAndPersistMovieDetails(movieId);

            expect(mockTmdbService.fetchMovieDetailsFromTmdb).toBeCalledTimes(1);
            expect(movieModel.create).toBeCalledTimes(1);
            expect(result).toEqual(movieDetails);
        });

        it('should handle errors when fetching and persisting movie details', async () => {
            const movieId = 1181748;
            const tmdbMovieDetails = {
                id: "1",
                title: 'Movie Title',
                belongs_to_collection: 'belongs_to_collection',
                adult: false,
                homepage: 'homepage',
                imdb_id: 'imdb_id',
                budget: 1,
                poster_path: 'poster_path',
                backdrop_path: 'backdrop_path',
                original_language: 'original_language',
                original_title: 'original_title',
                overview: 'overview',
                production_companies: ['production_companies'],
                production_countries: ['production_countries'],
                spoken_languages: ['spoken_languages'],
                status: 'status',
                tagline: 'tagline',
                genres: [{id: 1, name: 'genre_name'}],
                revenue: 1,
                runtime: 1,
                popularity: 1,
                vote_average: 1,
                vote_count: 1,
                video: false,
                release_date: 'release_date',
            };

            mockTmdbService.fetchMovieDetailsFromTmdb.mockResolvedValue(tmdbMovieDetails);
            movieModel.create = jest.fn().mockRejectedValue(new Error('Database error'));
            try {
                await service.fetchAndPersistMovieDetails(movieId);
            } catch (error) {
                expect(error.message).toEqual('Movie details could not be saved to database');
            }
        });
    });
});
