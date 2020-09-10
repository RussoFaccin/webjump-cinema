export const MOVIE_INFO_LIST = [
    {
        urlKey: 'upcoming',
        listKey: 'upcomingMovies',
        qty: 3
    },
    {
        urlKey: 'popular',
        listKey: 'popularMovies',
        qty: 10
    },
    {
        urlKey: 'now_playing',
        listKey: 'playingMovies',
        qty: 10
    }
];

export const RENDER_MOVIE_INFO = [
    {
        stateKey: 'popularMovies',
        containerSelector: '.movieContainer__popular'
    },
    {
        stateKey: 'playingMovies',
        containerSelector: '.movieContainer__playing'
    }
];