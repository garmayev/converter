export default class Event {
    private _id:number|null = null
    private _title:string|null = null
    private _intro:string|null = null
    private _content:string|null = null
    private _menu:string|null = null
    private _created:Date|null = null
    private _end:Date|null = null
    private _start:Date|null = null
    private _image:string|null = null
    private _region:string|null = null
    private _url:string|null = null

    get id(): number|null {
        return this._id;
    }

    set id(value: any) {
        this._id = Number.parseInt(value);
    }

    get title(): string|null {
        return this._title;
    }

    set title(value: string|null) {
        this._title = value;
    }

    get intro(): string|null {
        return this._intro;
    }

    set intro(value: string|null) {
        this._intro = value;
    }

    get content(): string|null {
        return this._content;
    }

    set content(value: string|null) {
        this._content = value;
    }

    get menu(): string|null {
        return this._menu;
    }

    set menu(value: string|null) {
        this._menu = value;
    }

    get created(): Date|null {
        return this._created;
    }
    set created(value: any) {
        this._created = new Date(Number.parseInt(value) * 1000);
    }
    get end(): Date|null {
        return this._end;
    }
    set end(value: any) {
        if (typeof value === "string")
        {
            const full = value.split(" ")
            const [day, month, year] = full[0].split("-")
            this._end = new Date(+year, +month - 1, +day);
        } else {
            this._end = new Date(value);
        }
    }
    get start(): Date|null {
        return this._start;
    }
    set start(value: any) {
        if (typeof value === "string") {
            const full = value.split(" ")
            const [day, month, year] = full[0].split("-")
            this._start = new Date(+year, +month - 1, +day);
        } else {
            this._start = new Date(value);
        }
    }
    get image(): string|null {
        return this._image;
    }
    set image(value: any) {
        this._image = value;
    }
    get region(): string|null {
        return this._region;
    }
    set region(value: any) {
        this._region = value;
    }
    get url(): string|null {
        return this._url;
    }
    set url(value: any) {
        this._url = value;
    }

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.intro = data.introtext;
        this.content = data.content;
        this.created = data.createdon;
        this.start = data.event_start;
        this.end = data.event_end;
        this.image = data.events_image;
        this.region = data.events_region;
        this.url = data.url;
    }

    static filter(array:Event[], date:any) {
        return array.filter((item) => {
            if (item.start && item.end) {
                const end = new Date(item.end);
                end.setDate(end.getDate() + 1)
                if ((item.start <= date) && (date <= end)) {
                    return true
                }
                return false
            }
        })
    }
}
