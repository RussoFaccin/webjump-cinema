export class CustomScroll {
    constructor(htmlElement) {
        const wrapper = document.createElement('div');

        wrapper.classList.add('customScroll__wrapper');
        
        wrapper.append(...htmlElement.children);

        this.pos = {
            x: 0,
            left: 0
        }

        this.scrollContainer = htmlElement;
        this.scrollContainer.append(wrapper);

        this._setBindings();

        if (this._hasScroll(htmlElement)) {
            wrapper.classList.add('customScroll__wrapper--has-scroll');
            
            this._setListeners();
            this._setResizeListener();
        }
    }

    _setBindings() {
        this._handleMouseDown = this._handleMouseDown.bind(this);
        this._handleMouseMove = this._handleMouseMove.bind(this);
        this._handleMouseUp = this._handleMouseUp.bind(this);
    }

    _setListeners() {
        this.scrollContainer.addEventListener('mousedown', this._handleMouseDown);
        this.scrollContainer.addEventListener('touchstart', this._handleMouseDown);
        this.scrollContainer.addEventListener('mouseup', this._handleMouseUp);
        this.scrollContainer.addEventListener('touchend', this._handleMouseUp);
    }

    _setResizeListener() {
        window.addEventListener('resize', this._calculateBounds);
    }

    _handleMouseDown(evt) {
        evt.preventDefault();

        let eventType = 'mousemove';

        if (evt.touches) {
            evt.clientX = evt.touches[0].clientX;
            eventType = 'touchmove';
        }

        this.pos.x = evt.clientX;
        this.scrollContainer.addEventListener(eventType, this._handleMouseMove);
    }

    _handleMouseMove(evt) {
        if (evt.touches) {
            evt.clientX = evt.touches[0].clientX;
        }

        let offset = evt.clientX - this.pos.x;

        if (evt.clientX !== 0) {
            let left = Number(this.pos.left) - offset;

            this.scrollContainer.scrollLeft = left;
        }
    }

    _handleMouseUp(evt) {
        this.scrollContainer.removeEventListener('mousemove', this._handleMouseMove);
        this.pos.left = Number(this.scrollContainer.scrollLeft);
    }

    _hasScroll(element) {
        const parentWidth = element.parentElement.clientWidth;
        const hasScroll = (element.scrollWidth - parentWidth) > 0 ?
            true :
            false;

        return hasScroll;
    }
}