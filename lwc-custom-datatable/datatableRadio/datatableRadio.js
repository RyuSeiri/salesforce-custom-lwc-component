import { LightningElement, track, api } from 'lwc';
export default class DatatableRadio extends LightningElement {
    @track _checked;


    /**
     * チェックフラグをゲット
     */
    @api
    get checked() {
        return this._checked || this._checked === 'true';
    }

    /**
     * チェックフラグをセット
     */
    set checked(val) {
        this._checked = val || '';
    }
}