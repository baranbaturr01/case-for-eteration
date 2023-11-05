import * as mongoose from "mongoose";

export const MovieDetailsSchema = new mongoose.Schema({
        id: String,
        adult: Boolean,
        backdropPath: String,
        belongsToCollection: Object,
        budget: Number,
        homepage: String,
        imdbId: String,
        originalLanguage: String,
        originalTitle: String,
        posterPath: String,
        productionCompanies: Object,
        productionCountries: Object,
        revenue: Number,
        runtime: Number,
        spokenLanguages: Object,
        status: String,
        tagline: String,
        title: String,
        video: Boolean,
        name: String,
        overview: String,
        popularity: Number,
        voteAverage: Number,
        voteCount: Number,
        releaseDate: String,
        genres: [
            {
                id: Number,
                name: String,
            },
        ],
    },
    {
        timestamps: true,
        collection: 'netflix.movies',
    }
);

export const MovieDetailsModel = mongoose.model('MovieDetails', MovieDetailsSchema);

