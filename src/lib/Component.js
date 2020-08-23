export class Component {
    constructor(elSelector) {
        this.nodeRoot = document.querySelector(elSelector);
        this.state = {}
    }
    setState(stateObj) {
        Object.assign(this.state, stateObj);
        this.render();
    }
}