import { commentsComponent } from '../comments/comments.js';

export const imageSummaryComponent = {
    template: `
        <div id="backdrop" v-on:click="handleClose"></div>
        <div id="popup">
            <form v-on:submit="deleteImg">
                <button id="deleteimg">DELETE</button> 
            </form>
            <img v-bind:src="image.url"> 
            <img v-bind:src="image.url" id='theimage'> 
            <h1>{{image.title}}</h1>             
            <p><em>Username:</em> {{image.username}}</p>
            <p><em>Description:</em> {{image.description}}</p>
            <p><em>Uploading time:</em> {{savedtime}}</p>
            <comments-component v-bind:imageid="imageid"></comments-component>
        </div>    
    `,
    // 

    // ------COMMUNCATION BETWEEN Parents and Child Components------
    props: ['imageid', 'savedtime'], // Properties that are passed in from parent
    emits: ['close', 'delete'], // removed the imagechanged
    
    data: () => {
        return {
            image: {},
            value: 0,
            images: []
        };
    },
    methods: {
        // handleImageChange: function (evt, index) {
        //     this.$emit('imagechanged', evt.target.value, index); // this.$emit from Vue that you can use to emit/send out events //evt.target.value, index
        // },
        handleClose() { //should close the modal
            this.$emit('close');
        },
        deleteImg(event){
            event.preventDefault();
            this.$emit('close');

            fetch(`/image/${this.imageid}`, {
                method: 'DELETE', 
            })
                .then(response => {
                    response.json();
                })
                .then(() => {
                    this.$emit('delete');
                })
                .catch((error) => {
                    console.error('Error in fetch delete:', error);
                });
        }
    },
    mounted(){
        this.currentImageId = window.location.hash.slice(1);
        console.log('currentImageId: ', this.currentImageId); 
        fetch(`/image/${this.currentImageId}`, {
            method: 'GET', 
        })
            .then(res => {
                return res.json();
            })
            .then(data => 
                this.image = data.myData);
    },
    components: {
        "comments-component": commentsComponent,
    },
};