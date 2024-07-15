export default class Gas {
    _title
    _moll
    _density
    _scales
    _defaultBalloon
    _balloons

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get moll() {
        return this._moll;
    }

    set moll(value) {
        this._moll = value;
    }

    get density() {
        return this._density;
    }

    set density(value) {
        this._density = value;
    }

    get scales() {
        return this._scales;
    }

    set scales(value) {
        this._scales = value;
    }

    get defaultBalloon() {
        return this._defaultBalloon;
    }

    set defaultBalloon(value) {
        this._defaultBalloon = value;
    }

    get balloons() {
        return this._balloons;
    }

    set balloons(value) {
        this._balloons = value;
    }

    constructor(props) {
        this.title = props.title
        this.moll = props.moll
        this.density = props.density
        this.scales = props.scales
        this.balloons = props.balloons
        this.defaultBalloon = props.defaultBalloon
    }
}
