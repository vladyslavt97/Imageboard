export const replyComponent = {
    template: `
        <div id="replyandreplies">
            <form v-on:submit="submitReply" id="reply-div">
                <div>
                    <span>Reply: </span><textarea v-model="reply" id="thereplyinput"/>
                </div>
                <div>
                    <span>Username: </span><input v-model="usernamereply">
                </div>  
                <button id="submitreply">Submit</button>
            </form>

            <div id="reply-results">
                <ul class="thereplyul">
                    <li v-for="r in replies" >
                        <h2 id="one-reply">Reply: <br><em>{{r.reply}}</em></h2>
                        <h2 id="one-reply-data"> User "{{r.username}}" commented on {{r.created_at}}</h2>
                    </li>
                </ul>
            </div>
        </div>

    `,

    props: ['commentid'], // Properties that are passed in from parent
    emits: [], // Events that will emit, so parent can react to it
    
    data: () => {
        return {
            replies: [],
            reply: '',
            usernamereply: '',
        };
    },
    methods: {
        submitReply(event){
            event.preventDefault();
            
            fetch('/reply/', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({reply: this.reply, usernamereply: this.usernamereply, commentid: this.commentid}),
            })
                .then((response) => 
                    response.json())
                .then((data) => {
                    this.replies.push(data.myReply);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            fetch(`/image/${this.commentid}`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({commentid: this.commentid}),
            })
                .then((response) => 
                    response.json())
                .then((data) => {
                    console.log('some info: ', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        
    },
    mounted(){
        fetch(`/reply/${this.commentid}`, {
            method: 'GET', 
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log('replies', data);
                this.replies = data.theReplies;
            })
            .catch(err => {
                console.log('error with comment fetch: ', err);
            });
    },
};