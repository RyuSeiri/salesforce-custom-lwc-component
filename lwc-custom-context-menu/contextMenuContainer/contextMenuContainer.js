import { LightningElement, track } from 'lwc';

export default class ContextMenuContainer extends LightningElement {
    @track positionX;
    @track positionY;

    //メニューアイテム設定
    @track menuItem = [{
            id: 0,
            name: 'メニュー1',
            value: 'menue1'
        },
        {
            id: 1,
            name: 'メニュー2',
            value: 'menue2'
        }
    ];

    /**
     * 右クリック
     * @param {*} event 
     */
    rightClick(event) {
        if (event.which == 3) {
            this.positionX = event.clientX;
            this.positionY = event.clientY;
            //右クリックメニュー表示
            this.template.querySelector('c-context-menu').openMenu();
        } else {
            //右クリックメニュー閉じる
            this.template.querySelector('c-context-menu').closeMenu();
        }
    }


    /**
     * 
     * @param {*} event 
     * @returns 
     */
    contextMenuHadler(event) {
        event.preventDefault();
        return false;
    }


    /**
     * 右クリックメニューハンドラー
     * @param {*} event 
     */
    contextMenuClickHandler(event) {
        let result = event.detail;
        const { id, name, value } = result;
        console.log(id, name, value);
    }
}