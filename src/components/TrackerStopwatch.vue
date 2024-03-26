<template>
    <section>
        <strong class="display"><i class="fas fa-stopwatch"></i> {{ elapsedTime }}</strong>
    </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TrackerStopwatch',
    props: {
        timeInSeconds: {
            type: Number,
            default: () => 0
        }
    },
    computed: {
        elapsedTime() {
            return new Date(this.timeInSeconds * 1000).toISOString().substring(11, 19);
        }
    },
    watch: {
        timeInSeconds(newVal) {
            console.log('Time updated:', newVal);
        }
    }
})
</script>
