import { LightningElement, api, track } from 'lwc';

export default class MenuItem extends LightningElement {
    @track _children = [];

    /**
     * childItemsを取得
     */
    @api
    get childItems() {
        return this._children;
    }

    /**
     * childItemsを設定
     * @param {any} value
     */
    set childItems(value) {
        this._children = value || [];
    }
}