
export const commentsComponent = {
    template: `
        <div>
            <span>Comment: </span><input v-model="comment">
        </div>
        <div>
            <span>Username: </span><input v-model="username">
        </div>  
        <div id="results">
            <ul>
                <li v-for="comment in comments">
                    <h2 id="one-comment">{{comment.comment}}</h2>
                    <h2 id="one-comment-data">{{comment.username}}{{comment.created_at}}</h2>
                </li>
            </ul>
        </div>  
    `,

    props: ['imageid', 'comments'], // Properties that are passed in from parent
    emits: ['imagechanged'], // Events that will emit, so parent can react to it
    
    data: () => {
        return {
            images: {},
        };
    },
    methods: {
        handleImageChange: function (evt, index) {
            this.$emit('imagechanged', evt.target.value, index); // this.$emit from Vue that you can use to emit/send out events //evt.target.value, index
        },
        handleClose() { //should close the modal
            this.$emit('close');
        }
    },
    mounted(){
        fetch(`/image/${this.imageid}`, {
            method: 'GET', 
        })
            .then(res => {
                return res.json();
            })
            .then(data => this.image = data);
    },
};