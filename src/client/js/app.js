import * as Vue from './vue.js';

Vue.createApp({
    data: () => {
        return {
            heading: 'Image-board by V.T.',
            headingClass: 'h1-header',
            images: [],
            greeting: 'Mint',
            file: null,
            filename: ''
        };
    },
    methods: {
        handleSubmit(event){
            console.log('target: ',event.target);
            event.preventDefault();

            const formData = new FormData();
            formData.append('filename', this.filename);
            formData.append('filee', this.file);

            // do fetch afterwards as a POST request. With the response you update your images array.
            fetch('/add-image', {
                method: 'POST', 
                body: formData
            })
            
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log('data from server :) ', data);
                    this.images = data;
                });
        },
        handleFileChange(event){
            console.log(event.target.files);
            this.file = event.target.files[0];
        }
    },
    created() {
        console.log('Vue app was created');
        fetch('/images')
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log('data from server :) ', data);
                console.log('images array: ', this.images);
                this.images = data;
            });
    }
}).mount('#main');