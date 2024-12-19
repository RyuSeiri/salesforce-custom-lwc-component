import { LightningElement, track } from 'lwc';

export default class MenuContainer extends LightningElement {

    @track items = [{
            label: 'メニュー1',
            items: [{
                label: 'サブメニュー1-1',
            }, {
                label: 'サブメニュー1-2',
            }, ],
        },
        {
            label: 'メニュー2',
            items: [{
                label: 'サブメニュー2-1',
            }, {
                label: 'サブメニュー2-2',
            }, ],
        },
    ];
}