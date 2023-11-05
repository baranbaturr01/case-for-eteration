import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {TmdbService} from "./tmdb/tmdb.service";
import {Movie, MovieDocument} from "./entity/movie.entity";
import {MovieDetail} from "./entity/movie-detail.entity";

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel('Movie') private movieModel: Model<MovieDocument>,
        @InjectModel('MovieDetail') private readonly movieDetailsModel: Model<MovieDetail>,
        private readonly tmdbService: TmdbService
    ) {
    }

    async saveMoviesToDatabase() {

        const movies = await this.tmdbService.fetchMovies();
        //     save to mongodb
        const saveToMongoDb = await this.movieModel.insertMany(movies);

        if (!saveToMongoDb) {
            return {
                success: false,
                message: 'Movies could not be saved to database'
            }
        }
        return saveToMongoDb
    }

    async findAll(): Promise<Movie[]> {
        return await this.movieModel.find().exec();
    }

    async findById(id: string): Promise<Movie> {
        return await this.movieModel.findOne({_id: id}).exec();
    }

    async create(movieData: Movie): Promise<Movie> {
        const createdMovie = new this.movieModel(movieData);
        return await createdMovie.save();
    }


    async removeById(id: string): Promise<Movie> {
        return await this.movieModel.findByIdAndRemove({_id: id}).exec();
    }

    async fetchAndPersistMovieDetails(movieId: number): Promise<MovieDetail> {
        const tmdbMovieDetails = await this.tmdbService.fetchMovieDetailsFromTmdb(movieId);
        const movieDetails = this.mapTmdbMovieDetailsToMovieDetails(tmdbMovieDetails);
        const savedMovieDetails = await this.movieDetailsModel.create(movieDetails);
        if (!savedMovieDetails) {
            throw new Error('Movie details could not be saved to database');
        }
        return movieDetails;
    }

    private mapTmdbMovieDetailsToMovieDetails(tmdbDetails): MovieDetail {
        return {
            title: tmdbDetails.title,
            adult: tmdbDetails.adult,
            backdrop_path: tmdbDetails.backdrop_path,
            belongs_to_collection: tmdbDetails.belongs_to_collection,
            budget: tmdbDetails.budget,
            homepage: tmdbDetails.homepage,
            imdb_id: tmdbDetails.imdb_id,
            original_language: tmdbDetails.original_language,
            original_title: tmdbDetails.original_title,
            poster_path: tmdbDetails.poster_path,
            production_companies: tmdbDetails.production_companies.map(company => ({
                id: company.id,
                logoPath: company.logo_path,
                name: company.name,
                originCountry: company.origin_country
            })),
            production_countries: tmdbDetails.production_countries.map(country => ({
                iso31661: country.iso_3166_1,
                name: country.name
            })),
            revenue: tmdbDetails.revenue,
            runtime: tmdbDetails.runtime,
            spoken_languages: tmdbDetails.spoken_languages.map(language => ({
                englishName: language.english_name,
                iso6391: language.iso_639_1,
                name: language.name
            })),
            status: tmdbDetails.status,
            tagline: tmdbDetails.tagline,
            video: tmdbDetails.video,
            id: tmdbDetails.id,
            name: tmdbDetails.title,
            overview: tmdbDetails.overview,
            popularity: tmdbDetails.popularity,
            vote_average: tmdbDetails.vote_average,
            vote_count: tmdbDetails.vote_count,
            release_date: tmdbDetails.release_date,
            genres: tmdbDetails.genres.map(genre => ({id: genre.id, name: genre.name}))
        } as MovieDetail;
    }

}
