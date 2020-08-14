/**
 * Movie model
 */
export class Movie {
    /**
     * Model constructor
     * @param {string} title 
     * @param {string} posterPath 
     * @param {string} [backdropPath] 
     * @param {boolean} [favorite] 
     */
    constructor(title, posterPath, backdropPath, favorite = false) {
        this._title = title;
        this._posterPath = posterPath;
        this._backdropPath = backdropPath;
        this._favorite = favorite;
    }
    toggleFavorite() {
        this._favorite = !this._favorite;
    }
    // Getters
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
}