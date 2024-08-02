import {Float} from "react-native/Libraries/Types/CodegenTypes";

const
    P = 101325,
    R = 8.314462;

export default class Gas {
    get mollValue(): Float {
        return this._moll_value;
    }
    set mollValue(value: Float) {
        this._moll_value = value;
    }
    _title: String
    _moll: Float        // Молярная масса
    _density: Float     // Плотность
    _scales: []
    _defaultBalloon: number
    _balloons: []
    private _liter: Float
    private _balloonDensity: number
    _state: String

    private _moll_value: Float  // Молярный объем
    private _kelvin: Float
    private _celsius: Float
    private _weight: Float
    private _liquid: Float
    private _gas: Float

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
        return (P * this.moll) / (R * this.kelvin)
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

    get balloonDensity(): number {
        return this._balloonDensity;
    }

    set balloonDensity(value: number) {
        this._balloonDensity = value;
    }

    get liter(): Float {
        return this._liter;
    }

    set liter(value: Float) {
        this._liter = value;
    }

    constructor(props) {
        this.title = props.title
        this.moll = props.moll
        this.density = props.density
        this.scales = props.scales
        this.balloons = props.balloons
        this.defaultBalloon = props.defaultBalloon
        this.mollValue = props.mollValue
        this.balloonDensity = props.balloonDensity
        this.liter = props.liter
    }

    get kelvin(): Float {
        return this._kelvin;
    }
    set kelvin(value: Float) {
        this._kelvin = value;
    }
    get celsius(): Float {
        return this._celsius;
    }
    set celsius(value: Float) {
        this._celsius = value;
    }

    temperature(value: Float, celsius:Boolean = false) {
        if (celsius) {
            this.celsius = value
            this.kelvin = value + 273.15
        } else {
            this.celsius = value - 273.15
            this.kelvin = value
        }
    }

    fromWeight(value) {
        this._weight = value;
        this._liquid = value / this._density;
        this._gas = value / this.density;
    }

    fromLiquid(value) {
        this._weight = value * this._density;
        this._liquid = value;
        this._gas = (value * this._density) / this.density;
    }

    fromGas(value) {
        this._weight = this.density * value;
        this._liquid = ((value * this.density) / this._density);
        this._gas = value;
    }

    get weight():Float {
        return this._weight
    }
    get liquid(): Float {
        return this._liquid;
    }
    get gas(): Float {
        return this._gas;
    }
    zIndex(density: Float): Float {
        return ((0.968 * density + 1) * this.mollValue) / (R * this.kelvin);
    }
}
