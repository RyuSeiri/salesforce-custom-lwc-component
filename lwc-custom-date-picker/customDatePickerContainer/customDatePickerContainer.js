import { LightningElement, track } from 'lwc';

export default class CustomDatePickerContainer extends LightningElement {
    @track date;

    selectHandler(event) {
        this.date = event.detail;
    }
}