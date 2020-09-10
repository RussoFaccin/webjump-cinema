export class CustomElement extends HTMLElement {
    constructor(props) {
        super();

        this.setProxyValidator();

        this.state = new Proxy(props, this._validator);
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
}