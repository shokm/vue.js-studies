let a = new Vue({
    el: '#app',
    data() {
        return {
            textCounter: ''
        }
    },
    computed: {
        count() {
            const array = [];
            array.push(...this.textCounter);
            return array.length;
        },
        exceptLine() {
            const result = this.textCounter.replace(/\n/g, "");
            const array = [];
            array.push(...result);
            return array.length;
        },
        exceptSpace() {
            const result = this.textCounter.replace(/\n/g, "").replace(/ /g, "").replace(/　/g, "");
            const array = [];
            array.push(...result);
            return array.length;
        },
        lines() {
            let result = 0;
            if (Number(this.count) !== 0) {
                result += Number(this.count) - Number(this.exceptLine) + 1;
            }
            return result;
        }
    }
})