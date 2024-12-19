import { LightningElement, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";
export default class DatatableButton extends NavigationMixin(LightningElement) {
  @api label;

  get isShowButton() {
    return this.label;
  }

  /**
   * ボタン押下
   * @param {*} e
   */
  buttonClickHandler(e) {
    e.preventDefault();
    let changenEvent = new CustomEvent("childbuttonclick", {
      detail: true,
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(changenEvent);
  }
}
