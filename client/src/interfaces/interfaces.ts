export interface User {
  [x: string]: any;
  id: number;
  userName: string;
  email: string;
  name: string;
  displayName?: string;
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
  status: boolean;  
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginProps {
  toggleView: (view: 'login' | 'signup') => void;
  setUser: (user: User | null) => void;
}

export interface Group {
  id: number;
  groupName: string;
  group_picture: string;
  banner: string;
  bio: string;
  privacyType: string;
  members: { userId: number; join_at: string }[];
  created_at: string;
}

export interface CreateCommunityModalProps {
  isOpen: boolean;
  handleClose: () => void;
  userId: string;
  onGroupCreated: () => void;
}

export interface CommunitiesProps {
  menuOpen: boolean;
}

export interface NewPostFormProps {
  communityId: number; 
  communityImageURL?: string;
  user: User;
}


export type Post = {
  id: number;
  user_id: number;
  group_id: number;
  content: string;
  image: string[];
  created_at: string;
  reactions: any[];
  type: 'public' | 'private';
};






//*****************************************************************************************************************************************/


// test bug



