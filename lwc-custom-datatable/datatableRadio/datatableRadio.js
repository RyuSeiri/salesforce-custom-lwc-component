/**
 * @description       : 
 * @author            : Lishilong
 * @group             : 
 * @last modified on  : 2022-03-18
 * @last modified by  : Lishilong
 * Modifications Log 
 * Ver   Date         Author      Modification
 * 1.0   2022-03-18   Lishilong   Initial Version
 **/

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