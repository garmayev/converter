export default class Ad {
    private _id
    private _title
    private _date
    private _description
    private _phone
    private _email
    private _name

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.date = props.date;
        this.description = props.description;
        this.phone = props.phone;
        this.email = props.email;
        this.name = props.name;
    }
}
