export interface Task {
    id: string;
    description: string;
    status: boolean; // Read --> true; Unread --> false
}

export interface UpdateTaskEndpoint {
    id: string;
    status: boolean; // Read --> true; Unread --> false
}

export interface AddTaskEndpoint {
    description: string;
}