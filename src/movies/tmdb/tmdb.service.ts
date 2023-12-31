import {Injectable} from '@nestjs/common';
import axios from "axios";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class TmdbService {
    private readonly apiKey: string
    private readonly token: string

    constructor(private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('TMDB_API_KEY');
        this.token = this.configService.get<string>('TMDB_TOKEN');

    }

    async fetchMovies() {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                params: {
                    api_key: this.apiKey,
                    sort_by: "release_date.asc",
                    vote_average_gte: 8.4,
                    watch_provider_id: 8,
                    watch_region: "TR",
                    vote_count_gte: 1500,
                    page: 1
                },
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.token}`
                }
            })
            return response.data.results.slice(0, 5)
        } catch (e) {
            throw new Error('Movies could not be fetched from TMDB');
        }

    }

    async fetchMovieDetailsFromTmdb(movieId: number) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                params: {
                    api_key: this.apiKey,
                },
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.token}`
                }
            });
            return response.data;
        } catch (e) {
            throw new Error('Movie details could not be fetched from TMDB');
        }

    }

}
