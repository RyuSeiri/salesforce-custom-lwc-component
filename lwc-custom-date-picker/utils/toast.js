/**
 * @description       : 
 * @author            : Lishilong
 * @group             : 
 * @last modified on  : 2021-09-16
 * @last modified by  : Lishilong
 * Modifications Log 
 * Ver   Date         Author      Modification
 * 1.0   2021-09-16   Lishilong   Initial Version
 **/
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/**
 * メッセージ表示
 * @param {window} that 
 * @param {string} title タイトール
 * @param {string} message メッセージ
 * @param {string} variant タイプ info、success、warning、error
 */
export const showToast = (that, title, message, variant) => {
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
    });
    that.dispatchEvent(event);
}

/**
 * 情報メッセージを表示
 * @param {*} that this
 * @param {*} message メッセージ
 */
export const showInfoToast = (that, message) => {
    showToast(that, 'Info', message, 'info');
}

/**
 * 成功メッセージを表示
 * @param {*} that this
 * @param {*} message メッセージ
 */
export const showSuccessToast = (that, message) => {
    showToast(that, 'Success', message, 'success');
}

/**
 *エラーメッセージを表示
 * @param {*} that this
 * @param {*} message メッセージ
 */
export const showErrorToast = (that, message) => {
    showToast(that, 'Error', message, 'error');
}

/**
 * ワーニングメッセージを表示
 * @param {*} that this
 * @param {*} message メッセージ
 */
export const showWarningToast = (that, message) => {
    showToast(that, 'Warning', message, 'warning');
}