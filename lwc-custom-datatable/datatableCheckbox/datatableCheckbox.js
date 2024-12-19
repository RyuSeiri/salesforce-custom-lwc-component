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