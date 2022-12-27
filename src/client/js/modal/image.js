export const imageSummaryComponent = {
    template: `
        <div id="backdrop"></div>
        <div id="popup">
            <h1>Modal component works</h1>
            <div v-for="image in images">
                <img v-bind:src="image.url" v-bind:alt="images">
            </div>
            <button v-on:click="handleClose">Close</button>        
        </div>    
    `,
    // ------COMMUNCATION BETWEEN Parent and Child Components------
    props: ['imageid', 'image'], // Properties that are passed in from parent
    emits: ['imagechanged', 'close'], // Events that will emit, so parent can react to it

    data: () => {
        return {
            images: [],
            showModal: false,
        };
    },
    methods: {
        handleImageChange: function (evt, index) {
            // this.$emit from Vue that you can use to emit/send out events
            this.$emit('imagechanged', evt.target.value, index);
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