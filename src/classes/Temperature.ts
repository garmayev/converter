export default class Temperature {
    private _title
    private _value
    private _density

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get density() {
        return this._density;
    }

    set density(value) {
        this._density = value;
    }

    constructor(props) {
        this.title = props.title
        this.value = props.value
        this.density = props.density
    }
}
