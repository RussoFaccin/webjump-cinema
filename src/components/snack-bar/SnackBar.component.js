import './SnackBar.component.css';

export class SnackBar extends HTMLElement {
    constructor(dismissTime = 3, actionText = 'Dismiss') {
        super();
        
        this.dismissTime = dismissTime;
        this.labelText = '';
        this.actionText = actionText;
        
        this.innerHTML = `
            <section class="snackBar">
                <p class="snackBar__message">${this.labelText}</h3>
                <button class="snackBar__action">${this.actionText}</button>
            </section>
        `;

        this.setBindings();
    }

    setBindings() {
        this._close = this._close.bind(this);
    }
    
    open(message = '') {
        this.labelText = message;
        
        const snackText = this.querySelector('.snackBar__message');
        snackText.textContent = this.labelText;
        
        const snackElement = this.querySelector('.snackBar');
        snackElement.classList.toggle('snackBar--active');

        setTimeout(this._close, (this.dismissTime * 1000));
    }

    _close() {
        const snackElement = this.querySelector('.snackBar');
        snackElement.classList.toggle('snackBar--active');
    }
}

customElements.define('snack-bar', SnackBar);