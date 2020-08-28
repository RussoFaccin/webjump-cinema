export const idbConfig = {
    DB_NAME: 'cinemaDB',
    STORE_LIST: new Map([
        ['popular', 'popularMovies'],
        ['now_playing', 'nowPlayingMovies'],
        ['upcoming', 'upcomingMovies']
    ])
}