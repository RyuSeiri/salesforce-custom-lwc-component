import { LightningElement, track, wire } from 'lwc';
import { MessageContext, publish } from 'lightning/messageService';
import COMMONMESSAGECHANNEL from '@salesforce/messageChannel/CommonMessageChannel__c'

export default class MessageChannelChild1 extends LightningElement {
    @track fisrtName;
    @track lastName;
    @track age;
    @track sex;
    @wire(MessageContext)
    messageContext;

    get options() {
        return [
            {
                label: 'MAN', value: 'MAN'
            },
            {
                label: 'WOMAN', value: 'WOMAN'
            }
        ]
    }

    setValue(e) {
        this[e.target.name] = e.target.value;
    }

    add(e) {
        const { fisrtName, lastName, age, sex } = this;
        const payload = { value: JSON.stringify({ fisrtName, lastName, age, sex }) };
        publish(this.messageContext, COMMONMESSAGECHANNEL, payload);
    }


}