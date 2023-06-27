import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
export default class PageB extends NavigationMixin(LightningElement) {

    //現在のルーターパス
    @wire(CurrentPageReference)
    currentPageReference;


    /**
     * 画面Bへ遷移
     * @param {*} event 
     */
    navigateToA(event) {
        event.preventDefault();
        this.navigateToNextPage('A');
    }

    /**
     * 画面遷移
     * @param {*} pageName 
     */
    navigateToNextPage(pageName) {
        const { apiName } = this.currentPageReference.attributes;
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/lightning/n/${apiName}?c__pageName=${pageName}`
            }
        });
    }
}