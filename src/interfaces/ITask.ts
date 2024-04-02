export default interface ITask {
    timeInSeconds: number;
    project: { name: string };
    description: string;
}