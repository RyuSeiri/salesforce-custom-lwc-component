import { LightningElement, track, api } from 'lwc';
import { dateFormat } from 'c/utils';

export default class CustomCalendar extends LightningElement {
    //今日
    today = new Date();
    //内部値
    @track _value;
    //年選択リスト
    @track selectYearList = [];
    //日選択リスト
    @track dayList = [];
    //現在年
    @track currentYear;
    //現在月
    @track currentMonth;
    //現在日
    @track currentDay;

    /**
     * 値取得
     */
    @api get value() {
        return this._value;
    }

    /**
     * 値設定
     */
    set value(val) {
        this._value = val;
        if (val) {
            this.showDate = val;
        } else {
            this.showDate = dateFormat(this.today, 'YYYY-mm-dd');
        }
        //年
        this.currentYear = Number(this.showDate.substring(0, 4));
        //月
        this.currentMonth = Number(this.showDate.substring(5, 7));
        //日
        this.currentDay = Number(this.showDate.substring(8, 10));
        //カレンダー作成
        this.createCalendar(this.currentYear, this.currentMonth);
        //プルダウン年を作成
        this.createYearOption(1900, this.today.getFullYear() + 100, this.currentYear);
    }

    /**
     * 前の月表示
     * @param {*} e イベント
     */
    prev(e) {
        e.preventDefault();

        if (this.currentMonth === 1) {
            this.currentMonth = 12;
            if (this.currentYear === 1900) {
                this.currentYear = 1900;
            } else {
                this.currentYear -= 1;
            }
        } else {
            this.currentMonth -= 1;
        }
        this.createCalendar(this.currentYear, this.currentMonth);
        //プルダウン年を作成
        this.createYearOption(1900, this.today.getFullYear() + 100, this.currentYear);
    }

    /**
     * 次の月表示
     * @param {*} e イベント
     */
    next(e) {
        e.preventDefault();
        if (this.currentMonth === 12) {
            this.currentMonth = 1;
            this.currentYear += 1;
        } else {
            this.currentMonth += 1;
        }

        this.createCalendar(this.currentYear, this.currentMonth);
        //プルダウン年を作成
        this.createYearOption(1900, this.today.getFullYear() + 100, this.currentYear);
    }

    /**
     * カレンダー作成
     * @param {*} year 年
     * @param {*} month 月
     */
    createCalendar(year, month) {
        let count = 0;
        let startDayOfWeek = new Date(year, month, 1).getDay();
        let endDate = new Date(year, month + 1, 0).getDate();
        let lastMonthEndDate = new Date(year, month, 0).getDate();
        let row = Math.ceil((startDayOfWeek + endDate) / 7);
        this.dayList = [];
        let selectedYear;
        let selectedMonth;
        if (this.value) {
            //年
            selectedYear = Number(this.showDate.substring(0, 4));
            //月
            selectedMonth = Number(this.showDate.substring(5, 7));
        }

        // 1行ずつ設定
        for (let i = 0; i < row; i++) {
            this.dayList.push({ value: [], id: i });
            // 1colum単位で設定
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startDayOfWeek) {
                    // 1行目で1日まで先月の日付を設定
                    this.dayList[i].value.push({
                        adjacentMonth: true,
                        today: false,
                        selected: false,
                        day: lastMonthEndDate - startDayOfWeek + j + 1,
                        value: `${this.currentYear}-${(this.currentMonth - 1).toString().padStart(2, '0')}-${(
                            lastMonthEndDate -
                            startDayOfWeek +
                            j +
                            1
                        )
                            .toString()
                            .padStart(2, '0')}`
                    });
                } else if (count >= endDate) {
                    // 最終行で最終日以降、翌月の日付を設定
                    count++;
                    this.dayList[i].value.push({
                        adjacentMonth: true,
                        today: false,
                        selected: false,
                        day: count - endDate,
                        value: `${this.currentYear}-${(this.currentMonth + 1).toString().padStart(2, '0')}-${(
                            count - endDate
                        )
                            .toString()
                            .padStart(2, '0')}`
                    });
                } else {
                    // 当月の日付を曜日に照らし合わせて設定
                    count++;
                    if (this.value && year === selectedYear && month === selectedMonth && count === this.currentDay) {
                        this.dayList[i].value.push({
                            adjacentMonth: false,
                            today: false,
                            selected: true,
                            day: count,
                            value: `${this.currentYear}-${this.currentMonth.toString().padStart(2, '0')}-${count
                                .toString()
                                .padStart(2, '0')}`
                        });
                    } else if (
                        year === this.today.getFullYear() &&
                        month === this.today.getMonth() + 1 &&
                        count === this.today.getDate()
                    ) {
                        this.dayList[i].value.push({
                            adjacentMonth: false,
                            today: true,
                            selected: false,
                            day: count,
                            value: `${this.currentYear}-${this.currentMonth.toString().padStart(2, '0')}-${count
                                .toString()
                                .padStart(2, '0')}`
                        });
                    } else {
                        this.dayList[i].value.push({
                            adjacentMonth: false,
                            today: false,
                            selected: false,
                            day: count,
                            value: `${this.currentYear}-${this.currentMonth.toString().padStart(2, '0')}-${count
                                .toString()
                                .padStart(2, '0')}`
                        });
                    }
                }
            }
        }
    }

    /**
     * セレクトボックスの中にオプションを生成する
     * @param {number} startNum オプションを生成する最初の数値
     * @param {number} endNum オプションを生成する最後の数値
     * @param {number} currentYear 現在の日付にマッチする数値
     */
    createYearOption(startNum, endNum, currentYear) {
        for (let year = startNum; year <= endNum; year++) {
            this.selectYearList.push({
                value: year,
                selected: year === currentYear
            });
        }
    }

    /**
     * 年を選択
     * @param {*} e
     */
    yearSelectChange(e) {
        e.preventDefault();
        let selectedIndex = e.target.selectedIndex;
        this.currentYear = e.target.options[selectedIndex].value;
        this.createCalendar(this.currentYear, this.currentMonth);
    }

    /**
     * CSSスタイル削除
     */
    removeCurrentlySelectedDateAttributes() {
        const element = this.template.querySelector("td[class*='slds-is-selected']");
        if (element) {
            element.classList.remove('slds-is-selected');
        }
    }

    /**
     * 日付を選択
     * @param {*} e
     */
    dateSelectChange(e) {
        e.preventDefault();
        let target = e.target;
        this.removeCurrentlySelectedDateAttributes();
        target.parentElement.classList.add('slds-is-selected');
        let dateStr = target.dataset.value;
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: dateStr
            })
        );
    }

    /**
     * 今日を選択
     * @param {*} e
     */
    todayClickHandler(e) {
        e.preventDefault();
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: dateFormat(this.today, 'YYYY-mm-dd')
            })
        );
    }
}