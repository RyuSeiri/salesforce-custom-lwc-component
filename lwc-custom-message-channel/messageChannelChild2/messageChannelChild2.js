import { LightningElement, track, wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    MessageContext,
    APPLICATION_SCOPE
} from 'lightning/messageService';
import COMMONMESSAGECHANNEL from '@salesforce/messageChannel/CommonMessageChannel__c'
export default class SubscribeTest2 extends LightningElement {
    @track fisrtName;
    @track lastName;
    @track age;
    @track sex;
    @wire(MessageContext)
    messageContext;

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                COMMONMESSAGECHANNEL,
                (message) => {
                    let data = JSON.parse(message.value)
                    const { fisrtName, lastName, age, sex } = data;
                    this.fisrtName = fisrtName;
                    this.lastName = lastName;
                    this.age = age;
                    this.sex = sex;
                },
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }


    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }


}