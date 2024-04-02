
import { NotificationType } from '@/interfaces/INotification';
import { store } from '@/store';
import { NOTIFY } from '@/store/type-mutations';

type Notifier = {
    notify: (type: NotificationType, title: string, message: string ) => void
}

export default () : Notifier => {
    const notify = (type: NotificationType, title: string, message: string ) => {
        store.commit(NOTIFY, { title, message, type })
    }
    return { notify }
}