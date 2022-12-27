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
            // selectedImageId: null,
        };
    },
    methods: {
        handleSubmit(event){
            console.log('target: ', event.target);
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
                    console.log('data from server ', data.myData);
                    this.images.unshift(data.myData);
                });
        },
        handleFileChange(event){
            console.log(event.target.files);
            this.file = event.target.files[0];
        },
        handleClickOnImage(image){
            // console.log('event: ', evt.target.files);
            console.log('image', image);
            const savedUrl = image.url;
            const savedTitle = image.title;
            console.log(savedUrl, savedTitle);
            this.showModal = true;
        },
        handleCloseEvent() { //should close the modal
            this.showModal = false;
        }
    },
    created() {
        console.log('Vue app was created');
        fetch('/images')
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log('images: ', data);
                this.images = data;
            });
    },
    //
    components: {
        'image-comp': imageSummaryComponent
    },
}).mount('#main');