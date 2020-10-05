export class CustomScroll {
    constructor(htmlElement) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('customScroll__wrapper');
        wrapper.append(...htmlElement.children);

        htmlElement.innerHTML = '';
        htmlElement.append(wrapper);

        this.scrollContainer = wrapper;

        this.pos = {
            left: 0,
            x: 0,
            minLeft: 0
        };

        const parentWidth = this.scrollContainer.parentElement.clientWidth;

        this.pos.maxLeft = Number((this.scrollContainer.scrollWidth - parentWidth) * -1);

        this._setBindings();

        this._setListeners();
    }

    _setBindings() {
        this._handleMouseDown = this._handleMouseDown.bind(this);
        this._handleMouseMove = this._handleMouseMove.bind(this);
        this._handleMouseUp = this._handleMouseUp.bind(this);
    }

    _setListeners() {
        this.scrollContainer.addEventListener('mousedown', this._handleMouseDown);
        this.scrollContainer.addEventListener('mouseup', this._handleMouseUp);
    }

    _handleMouseDown(evt) {
        evt.preventDefault();
        this.pos.x = evt.clientX;
        this.scrollContainer.addEventListener('mousemove', this._handleMouseMove);
    }

    _handleMouseMove(evt) {
        let offset = evt.clientX - this.pos.x;

        if (evt.clientX > 0) {
            offset = evt.clientX - this.pos.x;

            let left = Number(this.pos.left) + offset;

            if (left <= 0 && left >= this.pos.maxLeft) {
                this.scrollContainer.dataset.left = left;
                this.scrollContainer.style.transform = `translateX(${left}px)`;
            }
        }
    }

    _handleMouseUp(evt) {
        this.scrollContainer.removeEventListener('mousemove', this._handleMouseMove);
        this.pos.left = Number(this.scrollContainer.dataset.left);
    }

    _hasScroll() {
        const parentWidth = this.scrollContainer.parentElement.clientWidth;

        return (this.scrollContainer.scrollWidth - parentWidth) > 0 ?
            true : false;
    }
}