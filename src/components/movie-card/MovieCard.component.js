import './MovieCard.component.css';
// Models
import { Movie } from '../../models/Movie.model';

export class MovieCard extends HTMLElement {
  constructor({id, title, backdrop_path, poster_path, favorite}) {
    super();

    this.setProxyValidator();

    this.state = new Proxy(
      {
        id: id,
        title: title,
        backdrop_path: backdrop_path,
        poster_path: poster_path,
        favorite: favorite
      },
      this._validator
    )

    this.addEventListener('click', () => {
      this.toggleFavorite();
    });
    
  }

  setProxyValidator() {
    this._validator = {
        set(target, prop, value) {
            target[prop] = value;
            this.render();

            return Reflect.set(...arguments);
        }
    }

    this._validator.set = this._validator.set.bind(this);
}

  render() {
    this.innerHTML = `
      <section class="movieCard">
        <img class="movieCard__poster" src="https://image.tmdb.org/t/p/w154${this.state.poster_path}"/>
        <h3>${this.state.title}</h3>
        <svg class="movieCard__favoriteIcon ${this.getIconStatusClass()}" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1.57686C13.9929 -3.89752 26.4762 5.68204 9 18C-8.47622 5.68324 4.00711 -3.89752 9 1.57686Z"/>
        </svg>
      </section>
    `;
  }

  connectedCallback() {
    this.render();
  }

  toggleFavorite() {
    this.state.favorite = !this.state.favorite;
    this.emmitFavoriteEvent();
  }

  getIconStatusClass() {
    return this.state.favorite ?
      'movieCard__favoriteIcon--active' :
      null    
  }

  emmitFavoriteEvent() {
    const event = new CustomEvent('favorite', {detail: new Movie(this.state)});
    this.dispatchEvent(event)
  }
}

customElements.define("movie-card", MovieCard);
