export enum NotificationType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning'
}
export interface INotification {
    id: number
    title: string
    message: string
    type: NotificationType
}