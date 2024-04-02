import { store } from '@/store';
import { NOTIFY } from '@/store/type-mutations';
import { NotificationType } from '@/interfaces/INotification';

export const notificationMixin = {
    methods: {
        notify(type: NotificationType,title: string, message: string) : void {
            store.commit(NOTIFY, { title, message, type })
        }
    }
}