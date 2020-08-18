export const idbConfig = {
    DB_NAME: 'cinemaDB',
    STORE_LIST: new Map([
        ['popular', 'popularMovies'],
        ['playing', 'nowPlayingMovies'],
        ['upcoming', 'upcomingMovies']
    ])
}