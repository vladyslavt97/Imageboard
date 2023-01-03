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
            filteredImages: [],
            index: 0,
            // currentImageId: null
            savedDate: null,
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
            history.pushState({}, '', `/#${this.imageId}`);
            // this.currentUserID = this.imageId;
            this.showModal = true;
        },

        handleCloseEvent() {
            this.currentImageId = null;
            this.showModal = false;
            history.pushState({}, '', `/`);
        },
        handleImageDeletion(){
            this.value = this.images.findIndex(image => image.id === this.imageId);
            this.images.splice(this.value, 1);    
        },
            
        morePictures(event){
            event.preventDefault();
            this.index += 6;
            if (this.images.length < 6){
                this.showMore = false;
                console.log("hide the more button");
            } else {
                this.images.push();
            }
            
        }
    },
    mounted(){
        // this.currentImageId = window.location.hash.slice(1);
        if (!this.imageId && window.location.hash) {
            this.imageId = window.location.hash.split("#")[1];
            this.showModal = true;

        }

        this.imageId = window.location.hash.slice(1);
        addEventListener('popstate', (e) => {
            console.log('popstate event: ', location.href, e.state, this.imageId, window.location.hash);//.hash, e.state
            if (!this.showModal && window.location.hash) {
                this.imageId = window.location.hash.split("#")[1];
                this.showModal = true;

            }
            if (this.showModal && !window.location.hash) {
                this.imageId = null;
                this.showModal = false;
            }
        });
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