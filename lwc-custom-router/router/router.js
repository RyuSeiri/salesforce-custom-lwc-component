import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
export default class Router extends NavigationMixin(LightningElement) {
    //ルーターパス宣言
    @api path;

    //現在のルーターパス
    @wire(CurrentPageReference)
    currentPageReference

    /**
     * 現在のページかを判断する
     */
    get isCurrentPageName() {
        const { c__pageName } = this.currentPageReference.state;
        const { path } = this;
        return path === c__pageName;
    }
}