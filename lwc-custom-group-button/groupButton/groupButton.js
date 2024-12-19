import { LightningElement, api } from 'lwc';

export default class GroupButton extends LightningElement {
    //インデックス
    @api activeIndex;
    //ボタンリスト
    @api buttonList;
    //インデックス初期化
    id = -1;

    /**
     * インデックス取得
     */
    get getIndex() {
        this.id++;
    }

    /**
     * アクティブかを判断する
     */
    get isActive(){
        return Number(this.activeIndex) === this.id;
    }

    /**
     * グループボタン押下
     * @param {*} event 
     */
    onClickHandler(event) {
        let target = event.target;
        let clickedButton = this.template.querySelector('.slds-button_brand');
        clickedButton.classList.remove('slds-button_brand');
        clickedButton.classList.add('slds-button_neutral');
        target.classList.remove('slds-button_neutral');
        target.classList.add('slds-button_brand');
        // debugger;
        this.dispatchEvent(new CustomEvent('select', {
            detail: target.name
        }));
    }
}