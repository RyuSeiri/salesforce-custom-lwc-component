import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class DatatableNavigation extends NavigationMixin(LightningElement) {
    
    @api rowId
    @api name;

    /**
     * 画面遷移
     * @param {*} event 
     */
    navigatHandler(event) {
        event.preventDefault();
        const { rowId } = this;
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                recordId: rowId,
                actionName: 'view'
            }
        });
    }
}