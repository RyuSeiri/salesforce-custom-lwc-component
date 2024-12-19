import { LightningElement, api ,track } from 'lwc';
import { guid } from 'c/utils';
export default class DatatableOptionCheckbox extends LightningElement {
    @api isShow;
    @api checked;
    @track guid = guid();

    get isCheck() {
        const {checked} = this;
        return checked === 'true' || checked === true;
    }

    get isEnable() {
        const { isShow } = this;
        return isShow === 'true' || isShow === true;
    }
}