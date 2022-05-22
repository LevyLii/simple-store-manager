export interface Store {
    emit: () => void
    on: () => void
    getData: () => {}
    createStore: () => Store
}

declare const Store: Store

export default Store