export default class Balloon {
    _title
    _value

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

    constructor(props) {
        this.title = props.title ?? ""
        this.value = props.value ?? 0
    }
}
