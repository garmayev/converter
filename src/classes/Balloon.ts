export default class Balloon {
    private _title
    private _value
    private _liter

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

    get liter() {
        return this._liter;
    }

    set liter(value) {
        this._liter = value;
    }

    constructor(props) {
        this.title = props.title ?? ""
        this.value = props.value ?? 0
        this.liter = props.liter ?? 0
    }
}
