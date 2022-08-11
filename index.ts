const EventEmitter = require('events').EventEmitter

export class Store {
    protected emitter: any
    protected data: {}
    static createStore: () => Store

    constructor() {
        this.emitter = new EventEmitter()
        this.emitter.setMaxListeners(0)
        this.data = {}
    }

    emit(name: string, value: Object) {
        Object.assign(this.data, {[name]: value})
        this.emitter.emit('name', value)
    }

    on(name: string, func: Function) {
        this.emitter.on([name], (value) => {
            func(value)
        })
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