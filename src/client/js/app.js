import * as Vue from './vue.js';
// import moment from 'moment';
// import {image} from 'image.js';//not used
import { imageSummaryComponent } from './modal/image.js';
import { showerror } from './showerror/showerror.js';
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
            imageId: '',
            showModal: false,
            // showError: false,
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
                .then(alldata => {
                    this.images.unshift(alldata.myObj);//myObj
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
            // const savedDateF = moment(savedDate).format('DD-MM-YYYY');
            // console.log(new Date(savedDate));
            let formattedDate = new Date(image.created_at).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            this.savedDate = formattedDate;
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
        'image-comp': imageSummaryComponent,
        // 'showerror': showerror
    },
}).mount('#main');