import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export const showToast = (that, title, message, variant) => {
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
    });
    that.dispatchEvent(event);
}

export const showInfoToast = (that, message) => {
    showToast(that, 'Info', message, 'info');
}

export const showSuccessToast = (that, message) => {
    showToast(that, 'Success', message, 'success');
}

export const showErrorToast = (that, message) => {
    showToast(that, 'Error', message, 'error');
}

export const showWarningToast = (that, message) => {
    showToast(that, 'Warning', message, 'warning');
}