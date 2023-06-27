/**
 * @description       : 
 * @author            : Lishilong
 * @group             : 
 * @last modified on  : 2021-11-10
 * @last modified by  : Lishilong
 * Modifications Log 
 * Ver   Date         Author      Modification
 * 1.0   2021-11-10   Lishilong   Initial Version
 **/

import { LightningElement, api } from 'lwc';
export default class DatatableCheckbox extends LightningElement {
    @api checked;


    /**
     * CSSクラス
     */
    get Class() {
        const { checked } = this;
        if (checked || checked === 'true')
            return 'slds-truncate checked';
        return 'slds-truncate unchecked';

    }
}