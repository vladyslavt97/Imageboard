import * as Vue from './vue.js';

// import {image} from 'image.js';
import { imageSummaryComponent } from './modal/image.js';
Vue.createApp({
    data: () => {
        return {
            heading: 'Image-board by V.T.',
            headingClass: 'h1-header',
            images: [],
            greeting: 'Mint',
            file: null,
            filename: '',
            description: '',
            username: '',
            imageId: null,
            showModal: false,
            saved: {},
        };
    },
    methods: {
        handleSubmit(event){
            event.preventDefault();

            const formData = new FormData();
            formData.append('filename', this.filename);
            formData.append('description', this.description);
            formData.append('username', this.username);
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
                    console.log('data from server ', data.myObj);
                    this.images.unshift(data.myObj);
                })
                .catch(err => {
                    console.log('er: ', err);
                });
        },
        handleFileChange(event){
            this.file = event.target.files[0];
        },
        handleClickOnImage(image){
            this.saved = image;
            this.showModal = true;
        },
        handleCloseEvent() {
            this.showModal = false;
        }
    },
    created() {
        fetch('/images')
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.images = data;
            })
            .catch(err => {
                console.log('ereeee: ', err);
            });
    },
    //
    components: {
        'image-comp': imageSummaryComponent
    },
}).mount('#main');