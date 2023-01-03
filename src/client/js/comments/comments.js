import { replyComponent } from '../reply/reply.js';


export const commentsComponent = {
    template: `
        <form v-on:submit="submitComment" id="comment-div">
            <div>
                <span>Comment: </span><textarea v-model="comment" id="thecommentinput"/>
            </div>
            <div>
                <span>Username: </span><input v-model="usernamecomment">
            </div>  
            <button id="submitcomment">Submit</button>
        </form>

        <div id="results">
            <ul class="thecommentul">
                <li v-for="comment in comments" >
                    <h2 id="one-comment">Comment: <br><em>{{comment.comment}}</em></h2>
                    <h2 id="one-comment-data"> User "{{comment.username}}" commented on {{comment.created_at}}</h2>
                    <reply-component v-bind:commentid="comment.id"></reply-component>
                </li>
            </ul>
        </div>

    `,

    props: ['imageid'], // Properties that are passed in from parent
    emits: [], // Events that will emit, so parent can react to it
    
    data: () => {
        return {
            comments: [],
            comment: '',
            usernamecomment: '',
        };
    },
    methods: {
        submitComment(event){
            event.preventDefault();
            
            fetch('/comment/', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({comment: this.comment, usernamecomment: this.usernamecomment, imageid: this.imageid}),
            })
                .then((response) => 
                    response.json())
                .then((data) => {
                    this.comments.push(data.myComment);
                    console.log('sdsd',this.commentid);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        
    },
    mounted(){
        fetch(`/comment/${this.imageid}`, {
            method: 'GET', 
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.comments = data.theComments;
            })
            .catch(err => {
                console.log('error with comment fetch: ', err);
            });
    },
    components: {
        "reply-component": replyComponent,
    },
};