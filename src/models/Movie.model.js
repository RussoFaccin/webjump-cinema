/**
 * Movie model
 */
export class Movie {
    /**
     * Model constructor
     * @param {Number} id
     * @param {String} title 
     * @param {String} posterPath 
     * @param {String} [backdropPath] 
     * @param {Boolean} [favorite] 
     */
    constructor(id, title, posterPath, backdropPath, favorite = false) {
        this._id = id;
        this._title = title;
        this._posterPath = posterPath;
        this._backdropPath = backdropPath;
        this._favorite = favorite;
    }
    // Getters
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get posterPath() {
        return this._posterPath;
    }
    get backdropPath() {
        return this._backdropPath;
    }
    get favorite() {
        return this._favorite;
    }
    // Methods
    toggleFavorite() {
        this._favorite = !this._favorite;
    }
    toJson() {
        return JSON.stringify({
            id: this._id,
            title: this._title,
            posterPath: this._posterPath,
            backdropPath: this._backdropPath,
            favorite: this._favorite
        });
    }
}