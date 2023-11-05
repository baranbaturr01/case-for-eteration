import {Injectable} from '@nestjs/common';
import axios from "axios";

@Injectable()
export class TmdbService {
    private readonly apiKey = '4a769b2f0088542f557893235e736271'
    private readonly token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTc2OWIyZjAwODg1NDJmNTU3ODkzMjM1ZTczNjI3MSIsInN1YiI6IjY1NDYwYTM2ZmQ0ZjgwMDEwMWI1N2E3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YvCEZZWZ8CEbj09YgTBMcua1Z-mQvPp-eJ5dGiMs9ds'

    async fetchMovies() {
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
    }

    async fetchMovieDetailsFromTmdb(movieId: number) {
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
    }

}
