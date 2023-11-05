import * as mongoose from "mongoose";


export const MovieSchema = new mongoose.Schema({
    id: String, // UUID tipinde bir alan
    title: String, // Film adı
    adult: Boolean, // 18 yaşından büyükler için mi?
    backdrop_path: String, // Film arka planı
    original_language: String, // Film dil kodu
    overview: String, // Film hakkında açıklama
    popularity: Number, // Popülerlik değeri
    vote_average: Number, // Ortalama oy değeri
    vote_count: Number, // Oy sayısı
    video: Boolean, // Video var mı?
    release_date: String, // Yayın tarihi
    genre_ids: [Number], // Tür idleri
}, {
    timestamps: true,
    collection: 'movies'
})

export const Movie = mongoose.model('Movie', MovieSchema);