import { LightningElement, api } from 'lwc';

export default class Menu extends LightningElement {

    @api get items() {
        return this._items || [];
    }
    
    set items(value) {
        this._items = value;
    }
}