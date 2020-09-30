export class CustomScroll {
    constructor(htmlElement) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('customScroll__wrapper');
        wrapper.append(...htmlElement.children);
        htmlElement.innerHTML = '';
        htmlElement.append(wrapper);

        this.scrollContainer = htmlElement;

        this.pos = {
            left: 0,
            x: 0
        };

        // TO DO: Define scroll range
        // scrollWidth - offsetWidth

        this.pos.maxLeft = Number(this.scrollContainer.scrollWidth - this.scrollContainer.offsetWidth) * -1;
        this.pos.minLeft = 0;

        // Bindings
        this._handleMouseDown = this._handleMouseDown.bind(this);
        this._handleMove = this._handleMove.bind(this);
        this._handleMouseUp = this._handleMouseUp.bind(this);

        if (this._hasScroll()) {
            this.scrollContainer.addEventListener('mousedown', this._handleMouseDown);
        }
    }
    
    _handleMouseDown(evt) {
        this.pos.x = evt.clientX;
        this.scrollContainer.addEventListener('mousemove', this._handleMove);
        this.scrollContainer.addEventListener('mouseup', this._handleMouseUp);
    }

    _handleMove(evt) {
        evt.preventDefault();

        let left;
        let offset = evt.clientX - this.pos.x;

        if (
            this.pos.left + offset <= 0
            &&
            this.pos.left + offset >= this.pos.maxLeft
        ) {
            left =  Number(this.pos.left) + offset;
        } else {
            left = Number(this.scrollContainer.dataset.left );
        }

        this.scrollContainer.dataset.left = left;
        this.scrollContainer.style.transform = `translateX(${left}px)`;
    }

    _handleMouseUp(evt) {
        this.scrollContainer.removeEventListener('mousemove', this._handleMove);
        this.pos.left = Number(this.scrollContainer.dataset.left);
    }

    _hasScroll() {
        return (this.scrollContainer.scrollWidth - this.scrollContainer.offsetWidth) > 0 ?
            true : false;
    }
}