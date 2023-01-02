import * as Vue from './vue.js';
// import moment from 'moment';
// import {image} from 'image.js';//not used
import { imageSummaryComponent } from './modal/image.js';
// import { showerror } from './showerror/showerror.js';
Vue.createApp({
    data: () => {
        return {
            heading: 'Image-board by V.T.',
            headingClass: 'h1-header',
            images: [],
            // comments: [],
            greeting: 'Mint',
            file: null,
            filename: '',
            description: '',
            username: '',
            imageId: null, //null also gives null
            showModal: false,
            showMore: true,
            // showError: false,
            saved: {},
            // comment: '',
            // usernamecomment: '',
            filteredImages: [],
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
                    console.log(this.images.length);
                    if (this.images.length > 5){
                        this.images.unshift(alldata.myObj);
                        this.images.pop();
                    } else {
                        this.images.unshift(alldata.myObj);
                    }
                })
                .catch(err => {
                    console.log('er: ', err);
                });
        },
        handleFileChange(event){
            this.file = event.target.files[0];
        },
        handleClickOnImage(image){
            this.imageId = image.id;
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
        },
            
        
        morePictures(event){
            event.preventDefault();
            let index = 6;
            // this.images.slice(0, 6 += index);
            this.filteredImages = this.images;
            console.log('length: ', this.filteredImages.length += index);
            // console.log('length: ', this.images.slice(0, 6 += index));
            if (this.images.length < 6){//need to compare the current length with the length of all images in db
                this.showMore = false;
                console.log("hide the more button");
            } else {
                this.images.push();//add 6 more to the array
            }
            
        }
    },
    created() {
        fetch('/images')
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.images = data.slice(0, 6);
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