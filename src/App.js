import { Component } from './lib/Component';
// Api
import { api, API_KEY } from './api/api';
// Services
import { Idb } from './services/Idb.service';
import { DataService } from './services/data.service';
// Models
import { Movie } from './models/Movie.model';

export class App extends Component {
    constructor(elSelector) {
        super(elSelector);
        // DB
        this.idb = new Idb();
        // Data service
        this.DataService = new DataService();

        this.state = {
            upcomingMovies: [],
            popularMovies: [],
            playingMovies: [],
            favoriteMovies: []
        };
        // Get movies
        this.getMovies();

        this.render();
    }
    async getMovies() {
        // Upcoming movies. Latest 3.
        const upcomingMovies = await this.DataService.getMovieList('upcoming');
        
        this.setState({
            upcomingMovies: upcomingMovies.splice(0, 3).map((movie) => {
                return new Movie(movie);
            })
        });

        this.idb.putData(upcomingMovies.splice(0, 3), 'upcoming');

        // Popular movies. Latest 10.
        const popularMovies = await this.DataService.getMovieList('popular');
        
        this.setState({
            popularMovies: popularMovies.splice(0, 10).map((movie) => {
                return new Movie(movie);
            })
        });

        this.idb.putData(popularMovies.splice(0, 10), 'popular');

        // Now playing movies. Latest 10.
        const playingMovies = await this.DataService.getMovieList('now_playing');
        
        this.setState({
            playingMovies: playingMovies.splice(0, 10).map((movie) => {
                return new Movie(movie);
            })
        });

        this.idb.putData(playingMovies.splice(0, 10), 'now_playing');
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
                            <img src="https://image.tmdb.org/t/p/w1280${this.state.upcomingMovies[0]?.backdropPath}"/>
                            <div class="latestContainer__mainDescription"
                                <h4 class="latestContainer__mainTitle">${this.state.upcomingMovies[0]?.title}</h4>
                                <p class="latestContainer__mainText">${this.state.upcomingMovies[0]?.overview}</p>
                            </div>
                        </div>
                        <div class="latestContainer__secondary">
                            <div class="secondaryMovie">
                                <img src="https://image.tmdb.org/t/p/w780${this.state.upcomingMovies[1]?.backdropPath}"/>
                                <h4 class="secondaryMovie__title">${this.state.upcomingMovies[1]?.title}</h4>
                            </div>
                            <div class="secondaryMovie">
                                <img src="https://image.tmdb.org/t/p/w780${this.state.upcomingMovies[2]?.backdropPath}"/>
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
    }
}