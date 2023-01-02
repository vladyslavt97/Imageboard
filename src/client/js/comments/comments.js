
export const commentsComponent = {
    template: `
        <div>
            <span>Comment: </span><input v-model="comment">
        </div>
        <div>
            <span>Username: </span><input v-model="usernamecomment">
        </div>  
        <button id="submitcomment">Submit</button>
        <div id="results">
            <ul>
                <li v-for="comment in comments" id="onecomment">
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
            comments: [],
        };
    },
    methods: {
        
    },
    mounted(){
        
    },
};