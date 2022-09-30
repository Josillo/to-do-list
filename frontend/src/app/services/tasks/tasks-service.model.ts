export interface Task {
    id: string;
    description: string;
    status: boolean | number; // Read --> true | 1; Unread --> false | 0
}

export interface UpdateTaskEndpoint {
    id: string;
    status: boolean | number; // Read --> true | 1; Unread --> false | 0
}

export interface AddTaskEndpoint {
    description: string;
}