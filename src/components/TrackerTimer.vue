<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <TrackerStopwatch :timeInSeconds="timeInSeconds"></TrackerStopwatch>
        <TimerButton @click="start" icon="fas fa-play" label="Start" :disabled="stopwatchWorking" />
        <TimerButton @click="stop" icon="fas fa-stop" label="Stop" :disabled="!stopwatchWorking" />
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import TrackerStopwatch from './TrackerStopwatch.vue';
import TimerButton from './TimerButton.vue';

export default defineComponent({
    name: 'TrackerTimer',
    emits: ['timerFinished'],
    components: {
        TrackerStopwatch, TimerButton
    },
    data() {
        return {
            timeInSeconds: 0,
            stopwatch: 0,
            stopwatchWorking: false
        }
    },
    methods: {
        start() {
            this.stopwatchWorking = true;
            this.stopwatch = setInterval(() => {
                this.timeInSeconds += 1;
            }, 1000)
        },
        stop() {
            this.stopwatchWorking = false;
            clearInterval(this.stopwatch)
            this.$emit('timerFinished', this.timeInSeconds);
            this.timeInSeconds = 0;
        }
    }
})
</script>
