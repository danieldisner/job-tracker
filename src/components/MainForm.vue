<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Form for creating a new task">
                <input class="input" type="text" placeholder="What needs to be done?" v-model="description">
            </div>
            <div class="column">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                    <section>
                        <strong>{{ elapsedTime }}</strong>
                    </section>
                    <button class="button" @click="start">
                        <span class="icon">
                            <i class="fas fa-play"></i>
                        </span>
                        <span>Play</span>
                    </button>
                    <button class="button" @click="stop">
                        <span class="icon">
                            <i class="fas fa-stop"></i>
                        </span>
                        <span>Stop</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'MainForm',
    data() {
        return {
            timeInSeconds: 0,
            stopwatch: 0,
        }
    },
    computed: {
        elapsedTime(): string {
            return new Date(this.timeInSeconds * 1000).toISOString().substring(11, 19);
        }
    },
    methods: {
        start() {
            this.stopwatch = setInterval(() => {
                this.timeInSeconds += 1;
            }, 1000)
        },
        stop() {
            clearInterval(this.stopwatch);
        }
    }
});
</script>