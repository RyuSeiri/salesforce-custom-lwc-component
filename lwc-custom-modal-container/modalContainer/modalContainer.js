import { LightningElement, api, track } from 'lwc';

export default class ModalContainer extends LightningElement {
    @track isOpen;

    //コルバック
    @api closeCallBack;

    @api
    openModal() {
        this.isOpen = true;
    }

    @api
    closeModal() {
        this.isOpen = false;
        this.closeCallBack && this.closeCallBack();
    }

    target = null;
    drag = false;
    offsetX = 0;
    offsetY = 0;

    mouseX(e) {
        if (e.pageX) {
            return e.pageX;
        }
        if (e.clientX) {
            return e.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
        }
        return null;
    };

    mouseY(e) {
        if (e.pageY) {
            return e.pageY;
        }
        if (e.clientY) {
            return e.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
        }
        return null;
    };

    move(x, y) {
        if (!this.target)
            this.target = this.template.querySelector('.modal-draggable');
        let xPos = parseInt(this.target.style.left) || 0;
        let yPos = parseInt(this.target.style.top) || 0;
        this.target.style.left = (xPos + x) + 'px';
        this.target.style.top = (yPos + y) + 'px';
    };

    /**
     * マウス移動
     * @param {*} e  
     */
    mouseMove(e) {
        e.preventDefault();
        if (!this.drag) return true;
        let x = this.mouseX(e);
        let y = this.mouseY(e);
        if (x != this.offsetX || y != this.offsetY) {
            this.move(x - this.offsetX, y - this.offsetY);
            this.offsetX = x;
            this.offsetY = y;
        }
    };

    /**
     * Drag開始
     * @param {*} e 
     */
    startDrag(e) {
        e.preventDefault();
        this.offsetX = this.mouseX(e);
        this.offsetY = this.mouseY(e);
        this.drag = true;
    };

    /**
     * Drag終了
     * @param {*} e 
     */
    stopDrag(e) {
        e.preventDefault();
        this.drag = false;
    };

}