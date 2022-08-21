const EventEmitter = require('events').EventEmitter

export class Store {
    protected emitter: any
    protected data: {}
    protected list: {}
    static createStore: () => Store

    constructor() {
        this.emitter = new EventEmitter()
        this.emitter.setMaxListeners(0)
        this.data = {}
        this.list = {}
    }

    emit(name: string, value: any) {
        Object.assign(this.data, {[name]: value})
        this.emitter.emit([name], value)
    }

    on(name: string, func: (value: any) => void) {
        this.list[name] = func
        this.emitter.removeAllListeners()
        for (let key in this.list) {
            this.emitter.on(key, (value: any) => {
                this.list[key](value)
            })
        }
        // this.emitter.on([name], (value: any) => {
        //     func(value)
        // })
    }

    getData() {
        return this.data
    }
}

Store.createStore = (function () {
    let store;
    return function () {
        if (store) {
            return store
        } else {
            store = new Store()
            return store
        }
    }
})()