import { Component } from './lib/Component';
// Api
import { api, API_KEY } from './api/api';
// Services
import { Idb } from './services/Idb.service';

export class App extends Component {
    constructor(elSelector) {
        super(elSelector);
        // DB
        this.idb = new Idb();

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
        const upcomingMovies = await api.get('/upcoming', {
            params: {
                api_key: API_KEY
            }
        });
        
        this.setState({
            upcomingMovies: upcomingMovies.data.results.splice(0, 3)
        });

        this.idb.putData(upcomingMovies.data.results.splice(0, 3), 'upcoming');
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
                            <div class="latestContainer__mainDescription"
                                <h4 class="latestContainer__mainTitle">1917</h4>
                                <p class="latestContainer__mainText">Lightning McQueen, a hotshot rookie race car driven to succeed, discovers that life is about the journey, not the finish line, when he finds himself unexpectedly detoured in the sleepy Route</p>
                            </div>
                        </div>
                        <div class="latestContainer__secondary">
                            <div class="secondaryMovie">
                                <h4 class="secondaryMovie__title">Carros 2</h4>
                            </div>
                            <div class="secondaryMovie">
                                <h4 class="secondaryMovie__title">Bad Boys 2</h4>
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