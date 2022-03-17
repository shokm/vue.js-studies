const app = new Vue({
    el: '#app',
    data() {
        return {
            zipCode: '',
            pref: 'ここに住所が表示されます',
            city: '',
            town: '',
        }
    },
    watch: {
        zipCode: function(newValue, oldValue) {
            let len = Number(newValue.length);

            // 正規表現（半角数字のみ）
            let check = /^([1-9]\d*|0)$/;

            if (len >= 8) {
                // 7文字を超えたら前の値に戻す
                this.zipCode = oldValue;
            }

            if (len === 7 && check.test(newValue)) {
                this.getAddress();
            } else if (check.test(newValue) == false) {
                this.pref = '半角数字で入力してください';
                this.city = '';
                this.town = '';
            } else {
                this.pref = '';
                this.city = '';
                this.town = '';
            }
        }
    },
    methods: {
        getAddress() {
            axios.get('https://api.zipaddress.net/', {
                params: {
                    'zipcode': this.zipCode
                }
            })
            .then(response => { 
                // console.log(response.data.data);
                this.pref = response.data.data.pref;
                this.city = response.data.data.city;
                this.town = response.data.data.town;
            })
            .catch(() => {
                this.pref = '見つかりませんでした';
                this.city = '';
                this.town = '';
            });
        }
    } 
});