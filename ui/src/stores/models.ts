export interface UserRecord {
    id: string;
    email: string;
    name: string;
    verified: boolean;
    avatar: string;
    emailVisibility: boolean;
    created: string;
    updated: string;
}

export interface WorkFlowInfo {
    id: string;
    title: string;
    created: string;
    updated: string;
    image?: string; // Optional field for future use
    workflow: any;
}