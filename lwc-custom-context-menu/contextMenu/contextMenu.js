import { LightningElement, api, track } from 'lwc';
import * as constants from 'c/constants';

export default class MenuComponent extends LightningElement {
    @track _positionX;
    @track _positionY;
    @track _showMenu;
    @track _menuItem;
    @api name;

    /**
     * スタイル取得
     */
    get position() {
        const { _positionX, _positionY } = this;
        if (_positionX && _positionY) {
            // return `position:absolute;z-index: 999; top: ${_positionY}px; left:${_positionX}px`;
            return `top: ${_positionY}px; left:${_positionX}px`;
        } else {
            this.closeMenu();
            return '';
        }
    }

    /**
     * 座標Xを取得
     */
    @api
    get positionX() {
        return this._positionX;
    }
    /**
     * 座標Xを設定
     */
    set positionX(val) {
        this._positionX = val;
    }

    /**
     * 座標Yを取得
     */
    @api
    get positionY() {
        return this._positionY;
    }

    /**
     * 座標Yを設定
     */
    set positionY(val) {
        this._positionY = val;
    }

    /**
     * メニューアイテムを取得
     */
    @api
    get menuItem() {
        return this._menuItem;
    }

    /**
     * メニューアイテムを設定
     */
    set menuItem(val) {
        this._menuItem = val || [];
    }

    /**
     * メニューアイテム押下
     * @param {*} event 
     */
    clickHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        let target = event.target;
        let id = target.dataset.id;
        let name = target.dataset.name;
        let value = target.dataset.value;
        this.closeMenu();
        const clickEvent = new CustomEvent('rightclick', {
            detail: {
                id,
                name,
                value
            }
        });
        this.dispatchEvent(clickEvent);
    }

    @api
    closeMenu() {
        this._showMenu = false;
    }

    @api
    openMenu() {
        this._showMenu = true;
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
     * 初期化
     */
    connectedCallback() {
        this.navList = constants.menuBtn
    }
}