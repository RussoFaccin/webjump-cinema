import { Component } from './lib/Component';
// Config
import { MOVIE_INFO_LIST, RENDER_MOVIE_INFO } from './App.config';
// Services
import { Idb } from './services/Idb.service';
import { DataService } from './services/data.service';
// Models
import { Movie } from './models/Movie.model';
// Components
import { MovieCard } from './components/movie-card/MovieCard.component';

export class App extends Component {
    constructor(elSelector) {
        super(elSelector);
        
        this.idb = new Idb();
        
        this.dataService = new DataService();

        this.initState();

        this.setBindings();
        
        this.getMoviesAPI();

        this.getFavoriteMovies();

        this.render();
    }

    render() {
        this.nodeRoot.innerHTML = `
            <div class="appContent">
                <header class="appHeader">
                    <h1 class="appBrand"><a class="text-hide">Cinejump!</a></h1>
                    <div class="appHeader__action">
                        <nav class="appNavigation">
                            <a href="">Filmes</a>
                            <a href="">Series</a>
                        </nav>
                    </div>
                    <div class="appHeader__action">
                        <div class="subNav">
                            <button class="subNav__action">
                                <span class="u-srOnly">Search</span>
                            </button>
                            <a href="" class="subNav__action">
                                <span class="u-srOnly">Profile</span>
                            </a>
                        </div>
                    </div>
                </header>
                <main class="appMain">
                    <section class="latestContainer">
                        <div class="latestContainer__main">
                            <img src="https://image.tmdb.org/t/p/w1280${this.state.upcomingMovies[0]?.backdrop_path}"/>
                            <div class="latestContainer__mainDescription"
                                <h4 class="latestContainer__mainTitle">${this.state.upcomingMovies[0]?.title}</h4>
                                <p class="latestContainer__mainText">${this.state.upcomingMovies[0]?.overview}</p>
                            </div>
                        </div>
                        <div class="latestContainer__secondary">
                            <div class="secondaryMovie">
                                <img src="https://image.tmdb.org/t/p/w780${this.state.upcomingMovies[1]?.backdrop_path}"/>
                                <h4 class="secondaryMovie__title">${this.state.upcomingMovies[1]?.title}</h4>
                            </div>
                            <div class="secondaryMovie">
                                <img src="https://image.tmdb.org/t/p/w780${this.state.upcomingMovies[2]?.backdrop_path}"/>
                                <h4 class="secondaryMovie__title">${this.state.upcomingMovies[2]?.title}</h4>
                            </div>
                        </div>
                    </section>
                    <section class="movieContainer">
                        <h3 class="movieContainer__heading">Populares</h3>
                        <div class="movieContainer__popular"></div>
                    </section>
                    <section class="movieContainer">
                        <h3 class="movieContainer__heading">Em Exibição</h3>
                        <div class="movieContainer__playing"></div>
                    </section>
                    <section class="movieContainer">
                        <h3 class="movieContainer__heading">Favoritos</h3>
                        <div class="movieContainer__favorite"></div>
                    </section>
                </main>
                <footer class="appFooter">
                    <h1 class="footerBrand"><a class="text-hide">Cinejump!</a></h1>
                    <div class="footerNav">
                        <small>Desenvolvido por Lucas Gabriel</small>
                        <a href="">Proposta do projeto</a>
                        <a href="">Protótipo no Figma</a>
                        <a href="">Apresentação ao comitê</a>
                        <a href="">Documentação</a>
                    </div>
                </footer>
            </div>
        `;

        this.renderMovieSection();
    }
    
    initState() {
        this.state = {
            upcomingMovies: [],
            popularMovies: [],
            playingMovies: [],
            favoriteMovies: []
        };
    }

    setBindings() {
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    async getMoviesAPI() {
        MOVIE_INFO_LIST.forEach(async (movieInfo) => {
            const movieList = await this.dataService.getMovieList(movieInfo.urlKey);

            this.setState({
                [movieInfo.listKey]: movieList.splice(0, movieInfo.qty).map((movie) => {
                    return new Movie(movie);
                })
            });

            this.idb.putData(movieList.splice(0, movieInfo.qty), movieInfo.urlKey);
        });
    }

    async getFavoriteMovies() {
        const favoriteMovies = await this.idb.getData('favorite');
        
        this.setState({favoriteMovies: favoriteMovies});
    }
    /**
     * Retrieve movies from state
     * @param {String} stateKey movie state key
     */
    _getMoviesState(stateKey) {
        const movies = this.state[stateKey].map((movie) => {
            const foundInFavorite = this.state.favoriteMovies.find((foundMovie) => {
                return foundMovie.id === movie.id;
            })

            if (foundInFavorite) {
                movie.favorite = true;
            } else {
                movie.favorite = false;
            }

            const card = new MovieCard(movie);
            card.addEventListener('favorite', this.toggleFavorite);
            
            return card;
        });

        return movies;
    }
    
    renderMovieSection() {
        RENDER_MOVIE_INFO.forEach((movieInfo) => {
            const movies = this._getMoviesState(movieInfo.stateKey);
    
            this._renderMovieList(movies, movieInfo.containerSelector);
        });
    }
    
    toggleFavorite(evt) {
        const movie = evt.detail;
        const movieId = evt.detail.id;
        const tmpList = this.state.favoriteMovies;
        
        const foundId = this.state.favoriteMovies.findIndex((movie) => {
            return movie.id === movieId;
        });

        if (foundId === -1) {
            tmpList.push(movie);
        } else {
            tmpList.splice(foundId, 1);
        }

        this.setState({
            favoriteMovies: tmpList
        });

        this.idb.putData(tmpList, 'favorite');
    }

    /**
     * Render a list of movies on target container
     * @param {Movie[]} movieList list of movies
     * @param {String} targetContainerSelector container selector
     */
    _renderMovieList(movieList, targetContainerSelector) {
        const target = this.nodeRoot.querySelector(targetContainerSelector);
        target.innerHTML = '';
        
        movieList.forEach((movie) => {
            target.append(movie);
        });
    }
}