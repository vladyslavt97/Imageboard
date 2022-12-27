export const imageSummaryComponent = {
    template: `
        <div id="backdrop" v-on:click="handleClose"></div>
        <div id="popup">
            <img v-bind:src="this.blub.url"> 
            <h1>{{this.blub.title}}</h1>             
            <p>{{this.blub.username}}</p>
            <p>{{this.blub.description}}</p>
        </div>    
    `,
    // <button >Close</button>  
    // ------COMMUNCATION BETWEEN Parents and Child Components------
    props: ['imageid', 'blub'], // Properties that are passed in from parent
    emits: ['imagechanged', 'close'], // Events that will emit, so parent can react to it
    
    data: () => {
        return {
            images: {},
        };
    },
    methods: {
        handleImageChange() {
            this.$emit('imagechanged'); // this.$emit from Vue that you can use to emit/send out events //evt.target.value, index
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