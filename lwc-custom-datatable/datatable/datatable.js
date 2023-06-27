/**
 * @description       : 
 * @author            : Lishilong
 * @group             : 
 * @last modified on  : 2022-02-04
 * @last modified by  : Lishilong
 * Modifications Log 
 * Ver   Date         Author      Modification
 * 1.0   2022-02-04   Lishilong   Initial Version
 **/

import LightningDatatable from "lightning/datatable";
import navigationColumn from "./template/navigationColumn.html";
import checkboxColumn from "./template/checkboxColumn.html";
import buttonColumn from "./template/buttonColumn.html";
import optionCheckboxColumn from './template/optionCheckboxColumn.html';
import radioColumn from './template/radioColumn.html';
export default class Datatable extends LightningDatatable {
    static customTypes = {
        navigation: {
            template: navigationColumn,
            typeAttributes: ['Id'],
            standardCellLayout: true
        },
        checkbox: {
            template: checkboxColumn,
            standardCellLayout: true
        },
        custombutton: {
            template: buttonColumn,
            standardCellLayout: true
        },
        optionCheckbox: {
            template: optionCheckboxColumn,
            typeAttributes: ['optionChecked'],
            standardCellLayout: true
        },
        radio: {
            template: radioColumn,
            typeAttributes: ['checked'],
            standardCellLayout: true
        }
    };
}