import { LightningElement, track, api } from 'lwc';
import { guid } from 'c/utils';
export default class GroupRadio extends LightningElement {

    @track _options;
    @track _value;
    @api label;

    @api
    get options() {
        return this._options;
    }

    set options(val) {
        this._options = val;
    }


    @api
    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
    }


    get optionAndDatas() {
        return this.options.map(e => {
            return {
                id: guid(),
                checked: e.value === this.value,
                ...e,
            }
        });
    }

    /**
     * ラジオ選択
     * @param {*} e 
     */
    clickHandeler(e) {
        e.preventDefault();
        const event = new CustomEvent('select', {
            detail: e.target.value
        });
        this.dispatchEvent(event);
    }


}