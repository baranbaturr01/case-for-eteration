import {Body, Controller, Delete, Get, NotFoundException, Param, Post} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {Movie} from "./entity/movie.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {MovieDetail} from "./entity/movie-detail.entity";

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
    constructor(
        private readonly moviesService: MoviesService) {
    }

    @Post('save-to-database')
    @ApiOperation({summary: 'Save movies to database'})
    @ApiResponse({status: 200, description: 'Movies saved to database', type: Movie, isArray: true})
    async saveMoviesToDatabase() {
        const response = await this.moviesService.saveMoviesToDatabase();
        return response;
    }

    @Delete(':id')
    @ApiOperation({summary: 'Remove a movie by id'})
    @ApiResponse({status: 200, description: 'Movie removed', type: Movie, isArray: false})
    async removeById(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.removeById(id);
    }

    @Get('fetch-and-persist-movie-details/:movieId')
    @ApiOperation({summary: 'Fetch and persist movie details'})
    @ApiResponse({status: 200, description: 'Movie details fetched from TMDB and saved to database', type: MovieDetail, isArray: false})
    async fetchAndPersistMovieDetails(@Param('movieId') movieId: number) {
        const response = await this.moviesService.fetchAndPersistMovieDetails(movieId);
        return response
    }


    @Post()
    @ApiOperation({summary: 'Create a new movie'})
    @ApiResponse({status: 200, description: 'Movie created', type: Movie, isArray: false})
    async create(@Body() movieData: Movie): Promise<Movie> {
        return this.moviesService.create(movieData);
    }

    @Get(':id')
    @ApiOperation({summary: 'Find a movie by id'})
    @ApiResponse({status: 200, description: 'Movie found', type: Movie, isArray: false})
    async findById(@Param('id') id: string): Promise<Movie> {
        const movie = await this.moviesService.findById(id);
        if (!movie) {
            throw new NotFoundException('Movie not found');
        }
        return movie;
    }

    @Get()
    @ApiOperation({summary: 'Get all movies'})
    @ApiResponse({status: 200, description: 'Movies found', type: [Movie], isArray: true})
    async findAll(): Promise<Movie[]> {
        const movies = this.moviesService.findAll();
        if (!movies) {
            throw new NotFoundException('Movies not found');
        }
        return movies;
    }
}
