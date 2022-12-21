import * as Vue from './vue.js';

Vue.createApp({
    data: () => {
        return {
            heading: 'Image-board by V.T.',
            headingClass: 'h1-header',
            images: [],
            greeting: 'Mint',
            // count: 0,
        };
    },
    created() {
        console.log('Vue app was created');
        fetch('/test')
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log('data from server :) ', data);
                this.images = data;
            });
    },
    mounted() {
        console.log('Vue app was mounted');
    },
}).mount('#main');