export default class News {
    private _id
    private _title
    private _date
    private _content
    private _author
    private _picture
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

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get picture() {
        return this._picture;
    }

    set picture(value) {
        this._picture = value;
    }

    constructor(props) {
        this.id = props.id
        this.title = props.title
        this.date = new Date(props.created_at * 1000)
        this.content = props.body
        this.author = props.author
        this.picture = props.picture ?? ""
    }
}
