<template>
    <div class="notification">
        <article class="message" :class="context[notification.type]" v-for="notification in notifications"
            :key="notification.id">
            <div class="message-header">
                {{ notification.title }}
            </div>
            <div class="message-body">
                {{ notification.message }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotification';

export default defineComponent({
    name: 'AppNotifications',
    data() {
        return {
            context: {
                [NotificationType.Success]: 'is-success',
                [NotificationType.Warning]: 'is-warning',
                [NotificationType.Error]: 'is-danger'
            }
        }
    },
    setup() {
        const store = useStore();
        return {
            notifications: computed(() => store.state.notifications),
        }

    },
    methods: {
    }
})
</script>
<style scoped>
.notification {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 1.25rem;
    z-index: 105;
}
</style>