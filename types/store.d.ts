export interface Store {
    emit: (name: string, value: any) => void
    on: (name: string, func: (value: any) => void) => void
    getData: () => {}
    createStore: () => Store
}

declare const Store: Store

export default Store