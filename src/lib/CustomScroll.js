export class CustomScroll {
    constructor(htmlElement) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('customScroll__wrapper');
        wrapper.append(...htmlElement.children);
        htmlElement.innerHTML = '';
        htmlElement.append(wrapper);

        this.scrollContainer = htmlElement;

        console.dir(this.scrollContainer);

        this.pos = {
            left: 0,
            x: 0
        };

        // Bindings
        this._handleMouseDown = this._handleMouseDown.bind(this);
        this._handleMove = this._handleMove.bind(this);
        this._handleMouseUp = this._handleMouseUp.bind(this);

        this.scrollContainer.addEventListener('mousedown', this._handleMouseDown);
    }
    
    _handleMouseDown(evt) {
        this.pos.x = evt.clientX;

        this.scrollContainer.addEventListener('mousemove', this._handleMove);
        this.scrollContainer.addEventListener('mouseup', this._handleMouseUp);
        return false;
    }

    _handleMove(evt) {
        evt.preventDefault();
        let offset = evt.clientX - this.pos.x;
        console.log(offset);
        let left =  Number(this.pos.left) + offset;
        this.scrollContainer.dataset.left = left;
        this.scrollContainer.style.transform = `translateX(${left}px)`;
    }

    _handleMouseUp(evt) {
        this.scrollContainer.removeEventListener('mousemove', this._handleMove);
        this.pos.left = this.scrollContainer.dataset.left;
        console.log(this.pos.left);
        console.log(this.scrollContainer);
    }
}