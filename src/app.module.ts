import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MoviesModule} from './movies/movies.module';
import {MongooseModule} from "@nestjs/mongoose";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:30055/movie-app'),
        MoviesModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: 'src/movies/schemas/movie.schema.gql',
            driver: ApolloDriver,
            playground: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
