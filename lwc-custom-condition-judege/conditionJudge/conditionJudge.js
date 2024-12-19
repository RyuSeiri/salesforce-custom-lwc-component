import { LightningElement, api, track } from 'lwc';
export default class ConditionJudge extends LightningElement {

    // eq,noteq,gt:>,ge:>=,lt:<,le<:=,contains,not_contains 
    @api condition
    @api leftParam
    @api rightParam
    @track result

    connectedCallback() {
        const { condition, leftParam, rightParam } = this;
        try {
            // console.log(rightParam)
            switch (condition) {
                case "eq":
                    this.result = parseInt(leftParam) === parseInt(rightParam)
                    break;
                case "noteq":
                    this.result = parseInt(leftParam) !== parseInt(rightParam)
                    break;
                case "gt":
                    this.result = parseInt(leftParam) > parseInt(rightParam)
                    break;
                case "ge":
                    this.result = parseInt(leftParam) >= parseInt(rightParam)
                    break;
                case "lt":
                    this.result = parseInt(leftParam) < parseInt(rightParam)
                    break;
                case "le":
                    this.result = parseInt(leftParam) <= parseInt(rightParam)
                    break;
                case "contains":
                    this.result = leftParam.split(",").indexOf(String(rightParam)) !== -1
                    break;
                case "not_contains":
                    this.result = leftParam.split(",").indexOf(String(rightParam)) === -1
                    break;
                default:
                    break;
            }

        } catch (e) {
            console.error(e);
        }
    }
}