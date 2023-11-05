import {Test, TestingModule} from '@nestjs/testing';
import {MoviesController} from '../src/movies/movies.controller';
import {MoviesService} from "../src/movies/movies.service";
import {TmdbService} from "../src/movies/tmdb/tmdb.service";
import {MovieDetail} from "../src/movies/entity/movie-detail.entity";
import {Movie} from "../src/movies/entity/movie.entity";
import {getModelToken} from "@nestjs/mongoose";
import {NotFoundException} from "@nestjs/common";


describe('MoviesController', () => {
    let controller: MoviesController;
    let service: MoviesService;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MoviesController],
            providers: [MoviesService, TmdbService, {
                provide: getModelToken('Movie'),
                useValue: {}
            }, {
                provide: getModelToken('MovieDetail'),
                useValue: {}
            }
            ],
            imports: []
        }).compile();

        controller = module.get<MoviesController>(MoviesController);
        service = module.get<MoviesService>(MoviesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a new movie', async () => {
        const movieData = {
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
        jest.spyOn(service, 'create').mockResolvedValue(movieData);

        const result = await controller.create(movieData);
        expect(result).toEqual(movieData);
    });

    it('should remove a movie', async () => {
        const movieData = {
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
        jest.spyOn(service, 'removeById').mockResolvedValue(movieData);

        const result = await controller.removeById(movieData.id);
        expect(result).toEqual(movieData);
    });

    describe('saveMoviesToDatabase', () => {
        it('should save movies to the database', async () => {
            const saveMoviesToDatabaseResponse = {
                success: true,
                message: 'Movies saved to database',
                data: [
                    {
                        id: '1',
                        title: 'New Movie',
                        adult: false,
                        backdrop_path: 'backdrop_path',
                        original_language: 'original_language',
                        overview: 'overview',
                        popularity: 1,
                        vote_average: 1,
                        vote_count: 1,
                        video: false,
                        release_date: 'release_date',
                        genre_ids: [1],
                        _id: '1',
                        __v: 0,
                        createdAt: "2023-11-05T17:12:34.553Z",
                        updatedAt: "2023-11-05T17:12:34.553Z"

                    }
                ]
            };
            jest.spyOn(service, 'saveMoviesToDatabase').mockResolvedValue(saveMoviesToDatabaseResponse);

            const result = await controller.saveMoviesToDatabase();
            expect(result).toEqual(saveMoviesToDatabaseResponse);
        });
    });

    describe('removeById', () => {
        it('should remove a movie by ID', async () => {
            const movieId = '6546575d4309de1b89639be9';
            const removedMovie: Movie = {
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
            jest.spyOn(service, 'removeById').mockResolvedValue(removedMovie);

            const result = await controller.removeById(movieId);
            expect(result).toEqual(removedMovie);
        });
    });

    // describe('fetchAndPersistMovieDetails', () => {
    //
    //
    //     it('should fetch and persist movie details', async () => {
    //         const movieId = 1181748; // Provide a valid movie ID
    //         const movieDetails = {
    //             id: "1",
    //             title: 'Movie Title',
    //             belongs_to_collection: 'belongs_to_collection',
    //             adult: false,
    //             homepage: 'homepage',
    //             imdb_id: 'imdb_id',
    //             budget: 1,
    //             poster_path: 'poster_path',
    //             backdrop_path: 'backdrop_path',
    //             original_language: 'original_language',
    //             original_title: 'original_title',
    //             overview: 'overview',
    //             production_companies: ['production_companies'],
    //             production_countries: ['production_countries'],
    //             spoken_languages: ['spoken_languages'],
    //             status: 'status',
    //             tagline: 'tagline',
    //             genres: [{id: 1, name: 'genre_name'}],
    //             revenue: 1,
    //             runtime: 1,
    //             popularity: 1,
    //             vote_average: 1,
    //             vote_count: 1,
    //             video: false,
    //             release_date: 'release_date',
    //         };
    //         jest.spyOn(service, 'fetchAndPersistMovieDetails').mockResolvedValue(movieDetails);
    //
    //         const result = await controller.fetchAndPersistMovieDetails(movieId);
    //         expect(result).toEqual({
    //             success: true,
    //             message: 'Movie details fetched from TMDB and saved to database',
    //             data: movieDetails,
    //         });
    //     });
    // });

    describe('create', () => {
        it('should create a new movie', async () => {
            const newMovieData: Movie = {
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
            jest.spyOn(service, 'create').mockResolvedValue(newMovieData);

            const result = await controller.create(newMovieData);
            expect(result).toEqual(newMovieData);
        });
    });

    describe('findById', () => {
        it('should find a movie by ID', async () => {
            const id = "6546575d4309de1b89639be9";
            const foundMovie: Movie = {
                id: id,
                title: 'Found Movie',
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
            }; // Mock the found movie as needed
            jest.spyOn(service, 'findById').mockResolvedValue(foundMovie);

            const result = await controller.findById(id);
            expect(result).toEqual(foundMovie);
        });

        it('should throw a NotFoundException for an invalid movie ID', async () => {
            const movieId = 'invalid_id';
            jest.spyOn(service, 'findById').mockResolvedValue(null); // Movie not found

            try {
                await controller.findById(movieId);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('findAll', () => {
        it('should find and return all movies', async () => {
            const movies: Movie[] = [];
            jest.spyOn(service, 'findAll').mockResolvedValue(movies);

            const result = await controller.findAll();
            expect(result).toEqual(movies);
        });
    });

});
