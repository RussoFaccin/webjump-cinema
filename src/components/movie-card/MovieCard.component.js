import './MovieCard.component.css';
// Models
import { Movie } from '../../models/Movie.model';
// Components
import { CustomElement } from '../../lib/CustomElement';

export class MovieCard extends CustomElement {
  constructor(props) {
    super(props);

    this._setBindings();
  }

  render() {
    this.innerHTML = `
      <section class="movieCard">
        <img class="movieCard__poster" src="https://image.tmdb.org/t/p/w154${this.state.poster_path}" draggable="false"/>
        <h3 class="movieCard__title">${this.state.title}</h3>
        <svg class="movieCard__favoriteIcon ${this.getIconStatusClass()}" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1.57686C13.9929 -3.89752 26.4762 5.68204 9 18C-8.47622 5.68324 4.00711 -3.89752 9 1.57686Z"/>
        </svg>
      </section>
    `;

    this._setFavoriteListener();
  }

  connectedCallback() {
    this.render();
  }

  toggleFavorite() {
    this.state.favorite = !this.state.favorite;
    this.emmitFavoriteEvent();
  }

  _setBindings() {
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this._setFavoriteListener = this._setFavoriteListener.bind(this);
  }

  _setFavoriteListener() {
    const elm = this.querySelector('.movieCard__favoriteIcon');
    
    elm.addEventListener('click', this.toggleFavorite);
    elm.addEventListener('touchstart', this.toggleFavorite);
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
