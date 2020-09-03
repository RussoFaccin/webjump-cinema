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
    constructor({id, title, poster_path, backdrop_path, favorite = false}) {
        this.id = id;
        this.title = title;
        this.posterPath = poster_path;
        this.backdropPath = backdrop_path;
        this.favorite = favorite;
    }
    // Methods
    toggleFavorite() {
        this._favorite = !this._favorite;
    }
    toJson() {
        return {
            id: this._id,
            title: this._title,
            posterPath: this._posterPath,
            backdropPath: this._backdropPath,
            favorite: this._favorite
        };
    }
}