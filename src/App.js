import { Component } from './lib/Component';

export class App extends Component {
    constructor(elSelector) {
        super(elSelector);

        this.state = {};
        this.render();
    }
    render() {
        this.nodeRoot.innerHTML = `
            <header class="appHeader">Cinejump</header>
        `;
    }
}