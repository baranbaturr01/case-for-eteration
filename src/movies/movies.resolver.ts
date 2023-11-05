import {Args, Query, Resolver} from '@nestjs/graphql';
import {MoviesService} from "./movies.service";
import {Movie} from "./dto/movies.dto";

@Resolver()
export class MoviesResolver {

    constructor(private readonly moviesService: MoviesService) {
    }

    @Query(returns => [Movie], {name: 'movies'})
    async findById(@Args('id') id: string): Promise<Movie> {
        return this.moviesService.findById(id);
    }
}
