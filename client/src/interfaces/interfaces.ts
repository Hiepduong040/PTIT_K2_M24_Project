export interface User {
    id: number;
    userName: string;
    email: string;
    name: string;
    password: string;
    avatar: string;
    banner: string;
    bio: string;
    follows: any[]; // Adjust type as needed
    friends: any[]; // Adjust type as needed
    groups: any[];  // Adjust type as needed
    created_at: string;
}

export interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginProps {
    toggleView: (view: 'login' | 'signup') => void;
    setUser: (user: User | null) => void;
}
