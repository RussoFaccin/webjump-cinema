export class CustomScroll {
    constructor(htmlElement) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('customScroll__wrapper');
        wrapper.setAttribute('draggable', 'true');
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

        // Bindings
        this._handleDragStart = this._handleDragStart.bind(this);
        this._handleDrag = this._handleDrag.bind(this);
        this._handleDragEnd = this._handleDragEnd.bind(this);

        if (this._hasScroll()) {
            this.scrollContainer.addEventListener('dragstart', this._handleDragStart);
            this.scrollContainer.addEventListener('drag', this._handleDrag);
            this.scrollContainer.addEventListener('dragend', this._handleDragEnd);
        } else {
            this.scrollContainer.removeAttribute('draggable');
        }
    }

    _handleDragStart(evt) {
        const dragImage = document.createElement('img');
        evt.dataTransfer.setDragImage(dragImage, 0, 0);

        this.pos.x = evt.clientX;
    }

    _handleDrag(evt) {
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

    _handleDragEnd(evt) {
        this.pos.left = Number(this.scrollContainer.dataset.left);
    }

    _hasScroll() {
        const parentWidth = this.scrollContainer.parentElement.clientWidth;

        return (this.scrollContainer.scrollWidth - parentWidth) > 0 ?
            true : false;
    }
}