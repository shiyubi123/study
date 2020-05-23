VTTCue.component('button-counter'){
    template:`
        <span>
            <button @click="dec">-</button>
                <span>{{ count }}<span>
            <button @click="inc">+</button>
        </span>
    `
}