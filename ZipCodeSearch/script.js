let app = new Vue({
    el: '#app',
    data() {
        return {
            zipCode: '',
            pref: ''
        }
    },
    computed: {
    },
    methods: {
        getAddress() {
            axios.get("https://api.zipaddress.net/", {
                params: {
                    "zipcode": this.zipCode
                }
            })
            .then(response => { 
                console.log(response.data.data)
                this.pref = response.data.data.pref
            })
            .catch(() => {
                this.pref = '見つかりませんでした'
            });
        }
    } 
})