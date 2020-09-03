import './MovieCard.component.css';

export class MovieCard extends HTMLElement {
  constructor({id, title, poster_path, favorite}) {
    super();
    
    this._id = id;
    this._title = title;
    this._poster_path = poster_path;
    this._favorite = favorite;
    console.log('THIS', this);
  }

  render() {
    this.innerHTML = `
      <section class="movieCard">
        <img class="movieCard__poster" src="https://image.tmdb.org/t/p/w154${this._poster_path}"/>
        <h3>${this._title}</h3>
        <svg class="movieCard__favoriteIcon" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1.57686C13.9929 -3.89752 26.4762 5.68204 9 18C-8.47622 5.68324 4.00711 -3.89752 9 1.57686Z"/>
        </svg>
      </section>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("movie-card", MovieCard);
