const P = 101325,
    R = 8.314462;

export default class Gas {
    _title;
    _moll;
    _density;

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

    constructor(props) {
        this.title = props.title;
        this.moll = props.moll;
        this.density = props.density;
    }

    getKelvin(temperature) {
        return temperature + 273.15;
    }

    getDensity(temperature) {
        return (P * this.moll) / (R * this.getKelvin(temperature));
    }

    getLiquid(count, temperature) {
        console.log(this.density)
        console.log(this.getDensity(temperature))
        return count / this.density;
    }

    getGas(count, temperature) {
        return count * this.density;
    }

    getWeight(count, temperature) {

    }
}
