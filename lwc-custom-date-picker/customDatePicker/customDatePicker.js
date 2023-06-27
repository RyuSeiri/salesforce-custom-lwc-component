import { LightningElement, api, track } from 'lwc';
import { toDate } from 'c/utils';

/**
 * 日付選択コンポーネント
 */
export default class CustomDatePicker extends LightningElement {
    //ラベル
    @api label;
    //必須
    @api required;
    //名
    @api name;
    //最小値
    @api min;
    //最大値
    @api max;
    //最大値超えるメッセージ
    @api messageWhenRangeOverflow = 'The number is too high.';
    //最小値以下のメッセージ
    @api messageWhenRangeUnderflow = 'The number is too low.';
    //必須メッセージ
    @api messageWhenValueMissing = 'Complete this field.';
    //エラーありフラグ
    @track isHasError = false;
    //値
    @track _value = '';
    //カレンダー選択値
    @track calendarVal;
    //エラーメッセージ
    @track errorMessage;

    _open = false;
    _over = false;

    @api
    get value() {
        return this._value;
    }

    set value(val) {
        if (val.length >= 8) {
            //年
            const year = val.substring(0, 4);
            //月
            const month = val.substring(5, 7);
            //日
            const day = val.substring(8, 10);
            this._value = `${month}/${day}/${year}`;
            this.calendarVal = val;
        }
    }

    /**
     * CSSスタイル
     */
    get inputClass() {
        if (this.isHasError) {
            return 'slds-input-has-icon slds-input-has-icon_right slds-has-error';
        }
        return 'slds-input-has-icon slds-input-has-icon_right';
    }

    /**
     * エラーがあるかどうかをチェックする
     */
    hasError() {
        const reg = new RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);
        if (this.max && this.value && toDate(this.value) > toDate(this.max)) {
            this.isHasError = true;
            this.errorMessage = this.messageWhenRangeOverflow;
        } else if (this.min && this.value && toDate(this.value) < toDate(this.min)) {
            this.isHasError = true;
            this.errorMessage = this.messageWhenRangeUnderflow;
        } else if (this.required && !this.value) {
            this.errorMessage = this.messageWhenValueMissing;
            this.isHasError = true;
            this._value = null;
        } else if (this.value && !reg.exec(this.value)) {
            this.errorMessage = this.messageWhenValueMissing;
            this.isHasError = true;
            this._value = null;
        } else if (this.value && reg.exec(this.value)) {
            this.errorMessage = this.messageWhenValueMissing;
            this.isHasError = false;
        } else if (!this.value) {
            this.errorMessage = this.messageWhenValueMissing;
            this.isHasError = false;
        }
    }


    /**
     * チェンジイベントハンドラ
     * @param {*} event
     */
    changeHandler(event) {
        this.closeDropdown();
        this._value = event.target.value;
        this.hasError();
    }

    /**
     * 入力チェック
     * @returns チェック結果
     */
    @api checkValidity() {
        this.hasError();
        return !this.isHasError;
    }

    /**
     * カレンダー選択
     * @param {*} event
     */
    calendarSelectHandler(event) {
        event.preventDefault();
        const value = event.detail;
        this.template.host.value = value;
        this.calendarVal = value;
        this.hasError();
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: value
            })
        );
        this.closeDropdown();
    }


    /* 
     * following pair of functions are a clever way of handling a click outside,
     * despite us not having access to the outside dom.
     * see: https://salesforce.stackexchange.com/questions/255691/handle-click-outside-element-in-lwc
     */
    focusHandler(event) {
        //prevent firing more than once per focus (too many listeners get added)
        if (this._open) {
            return;
        }
        event.cancelBubble = true;
        event.stopPropagation();
        event.preventDefault();
        this.openDropdown();
        setTimeout(() => {
            document.addEventListener("click", this.handleClose, false);
        }, 100);

    }

    clickHandler(event) {
        event.cancelBubble = true;
        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * 
     * @param {*} event 
     * @returns 
     */
    handleClose = (event) => {
        if (this._over) {
            return;
        }
        event.stopPropagation();
        this.closeDropdown();
        document.removeEventListener("click", this.handleClose, false);
    };

    /**
     * 
     */
    openDropdown() {
        this._open = true;
        this._over = false;
    }

    /**
     * 
     */
    closeDropdown() {
        this._open = false;
        this._over = false;
    }

    /**
     * 
     */
    handleMouseOver() {
        this._over = true;
    }


    /**
     * 
     */
    handleMouseOut() {
        this._over = false;
    }


}