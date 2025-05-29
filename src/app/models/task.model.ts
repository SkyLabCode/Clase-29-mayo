export interface Task {
    id?: string;
    title: string;
    description: string;
    datetime: string;
    status: 'nueva' | 'en proceso' | 'completada';
}