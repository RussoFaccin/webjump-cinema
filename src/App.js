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
import { SnackBar } from  './components/snack-bar/SnackBar.component';
// Libs
import { CustomScroll } from './lib/CustomScroll';
// Assets
import logo from './assets/Logo-white.svg';

export class App extends Component {
    constructor(elSelector) {
        super(elSelector);
        
        this.idb = new Idb();
        
        this.dataService = new DataService();

        this.initState();

        this.setBindings();

        this.setOfflineListener();
        
        this.getMoviesAPI();

        this.getFavoriteMovies();

        this.appendSnackBar();

        this.render();
    }

    render() {
        this.nodeRoot.innerHTML = `
            <div class="appContent">
                <header class="appHeader">
                    <a href="" class="appBrand">
                        <img class="appBrand__logo" src="${logo}" alt="Cinejump!"/>
                        <h1 class="u-srOnly">Cinejump!</h1>
                    </a>
                    <div class="appHeader__action appHeader__action--navigation">
                        <nav class="appNavigation">
                            <a class="navLink" href="">Filmes</a>
                            <a class="navLink" href="">Series</a>
                        </nav>
                    </div>
                    <div class="appHeader__action appHeader__action--subNav">
                        <div class="subNav">
                            <button class="subNav__action subNav__icon subNav__icon--iconSearch">
                                <span class="u-srOnly">Buscar</span>
                            </button>
                            <a href="" class="subNav__action subNav__icon subNav__icon--iconProfile">
                                <span class="u-srOnly">Perfil</span>
                            </a>
                        </div>
                    </div>
                </header>
                <main class="appMain">
                    <section class="latestContainer">
                        <div class="latestContainer__main card">
                            <img class="cardPicture"
                                srcset="https://image.tmdb.org/t/p/w300${this.state.upcomingMovies[0]?.backdrop_path} 300w,
                                        https://image.tmdb.org/t/p/w780${this.state.upcomingMovies[0]?.backdrop_path} 780w,
                                        https://image.tmdb.org/t/p/w1280${this.state.upcomingMovies[0]?.backdrop_path} 1280w"
                                sizes="(max-width: 700px) 85vw, 710px"
                                src="https://image.tmdb.org/t/p/w1280${this.state.upcomingMovies[0]?.backdrop_path}"
                                "/>
                            <div class="latestContainer__mainDescription">
                                <h4 class="latestContainer__mainTitle">${this.state.upcomingMovies[0]?.title}</h4>
                                <p class="latestContainer__mainText">${this.state.upcomingMovies[0]?.overview}</p>
                            </div>
                        </div>
                        <div class="secondaryMovie secondaryMovie--first card">
                            <img class="cardPicture"
                            srcset="https://image.tmdb.org/t/p/w300${this.state.upcomingMovies[1]?.backdrop_path} 300w,
                                    https://image.tmdb.org/t/p/w780${this.state.upcomingMovies[1]?.backdrop_path} 780w,
                                    https://image.tmdb.org/t/p/w1280${this.state.upcomingMovies[1]?.backdrop_path} 1280w"
                            sizes="(max-width: 700px) 40.85vw, 274px"
                                src="https://image.tmdb.org/t/p/w780${this.state.upcomingMovies[1]?.backdrop_path}"/>
                            <h4 class="secondaryMovie__title">${this.state.upcomingMovies[1]?.title}</h4>
                        </div>
                        <div class="secondaryMovie secondaryMovie--last card">
                            <img class="cardPicture"
                            srcset="https://image.tmdb.org/t/p/w300${this.state.upcomingMovies[2]?.backdrop_path} 300w,
                                    https://image.tmdb.org/t/p/w780${this.state.upcomingMovies[2]?.backdrop_path} 780w,
                                    https://image.tmdb.org/t/p/w1280${this.state.upcomingMovies[2]?.backdrop_path} 1280w"
                            sizes="(max-width: 700px) 40.85vw, 274px"
                            src="https://image.tmdb.org/t/p/w780${this.state.upcomingMovies[2]?.backdrop_path}"/>
                            <h4 class="secondaryMovie__title">${this.state.upcomingMovies[2]?.title}</h4>
                        </div>
                    </section>
                    <section class="movieContainer">
                        <h3 class="movieContainer__heading">Populares</h3>
                        <div class="movieContainer__list movieContainer__popular" custom-scroll>Carregando...</div>
                    </section>
                    <section class="movieContainer">
                        <h3 class="movieContainer__heading">Em Exibição</h3>
                        <div class="movieContainer__list movieContainer__playing" custom-scroll>Carregando...</div>
                    </section>
                    <section class="movieContainer">
                        <h3 class="movieContainer__heading">Favoritos</h3>
                        <div class="movieContainer__list movieContainer__favorite" custom-scroll>Nenhum filme adicionado aos favoritos.</div>
                    </section>
                </main>
                <footer class="appFooter">
                    <a href="" class="footerBrand">
                        <img class="appBrand__logo" src="${logo}" alt="Cinejump!"/>
                        <h1 class="u-srOnly">Cinejump!</h1>
                    </a>
                    <div class="footerNav">
                        <small>Desenvolvido por Lucas Gabriel</small>
                        <a class="footerNav__link" href="">Proposta do projeto</a>
                        <a class="footerNav__link" href="">Protótipo no Figma</a>
                        <a class="footerNav__link" href="">Apresentação ao comitê</a>
                        <a class="footerNav__link" href="">Documentação</a>
                    </div>
                </footer>
                <div class="snackBar__container"></div>
            </div>
        `;

        this.renderMovieSection();
        this.initCustomScroll();
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
        this._updateOnlineStatus = this._updateOnlineStatus.bind(this);
    }

    setOfflineListener() {
        window.addEventListener('online', this._updateOnlineStatus);
        window.addEventListener('offline', this._updateOnlineStatus);
    }

    _updateOnlineStatus() {
        const isOnline = navigator.onLine;

        this.snackBar.open(`
            Você está ${this._getOnlineStatus()}
        `);
    }

    _getOnlineStatus() {
        return navigator.onLine ? 'online' : 'offline';
    }

    async getMoviesAPI() {
        MOVIE_INFO_LIST.forEach(async (movieInfo) => {
            const movieList = await this.dataService.getMovieList(movieInfo.urlKey);

            this._putMoviesState(movieInfo.listKey, movieList.splice(0, movieInfo.qty));

            this.idb.putData(movieList.splice(0, movieInfo.qty), movieInfo.urlKey);
        });
    }

    async getFavoriteMovies() {
        const favoriteMovies = await this.idb.getData('favorite');
        this._putMoviesState('favoriteMovies', favoriteMovies);
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

    /**
     * Put movies into state
     * @param {String} stateKey 
     * @param {Movie[]} movieList 
     */
    _putMoviesState(stateKey, movieList) {
        this.setState({
            [stateKey]: movieList.map((movie) => {
                return new Movie(movie);
            })
        });       
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

        this._putMoviesState('favoriteMovies', tmpList)

        this.idb.putData(tmpList, 'favorite');
    }
    /**
     * Append SnackBar to element
     * @param {String} containerSelector Container selector element
     */
    appendSnackBar() {
        this.snackBar = new SnackBar();
        this.snackBar.classList.add('snackBar__container');
        
        document.body.append(this.snackBar);
    }

    initCustomScroll() {
        const elementList = this.nodeRoot.querySelectorAll('[custom-scroll]');
        
        elementList.forEach((el) => {
            if (el.firstElementChild) {
                new CustomScroll(el);
            }
        });
    }

    /**
     * Render a list of movies on target container
     * @param {Movie[]} movieList list of movies
     * @param {String} targetContainerSelector container selector
     */
    _renderMovieList(movieList, targetContainerSelector) {
        const target = this.nodeRoot.querySelector(targetContainerSelector);

        if (movieList.length > 0) {
            target.innerHTML = '';

            movieList.forEach((movie) => {
                target.append(movie);
            });
        }
    }
}