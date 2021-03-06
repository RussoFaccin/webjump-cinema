/**
 * Movie model
 */
export class Movie {
    /**
     * Model constructor
     * @param {Number} id
     * @param {String} title 
     * @param {String} poster_path 
     * @param {String} [backdrop_path] 
     * @param {Boolean} [favorite] 
     */
    constructor({id, title, overview, poster_path, backdrop_path, favorite = false}) {
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.poster_path = poster_path;
        this.backdrop_path = backdrop_path;
        this.favorite = favorite;
    }
    // Methods
    toggleFavorite() {
        this.favorite = !this.favorite;
    }
    toJson() {
        return {
            id: this.id,
            title: this.title,
            poster_path: this.poster_path,
            backdrop_path: this.backdrop_path,
            favorite: this.favorite
        };
    }
}