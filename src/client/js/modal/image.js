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
    emits: ['imagechanged', 'close'], // Events that will emit, so parent can react to it
    
    data: () => {
        return {
            image: {},
        };
    },
    methods: {
        handleImageChange: function (evt, index) {
            this.$emit('imagechanged', evt.target.value, index); // this.$emit from Vue that you can use to emit/send out events //evt.target.value, index
        },
        handleClose() { //should close the modal
            this.$emit('close');
        },
        deleteImg(event){
            event.preventDefault();
            
            fetch('/delete/', {
                method: 'POST', 
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({comment: this.comment, usernamecomment: this.usernamecomment, imageid: this.imageid}),
            })
            // .then((response) => 
            //     // response.json())
                .then(() => {
                    // this.comments.push(data.myComment);
                    this.$emit('close');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    },
    mounted(){
        fetch(`/image/${this.imageid}`, {
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