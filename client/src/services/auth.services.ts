import { User, FormData, LoginData } from '../interfaces/interfaces';

// Register a new user
export const registerUser = async (formData: FormData): Promise<User> => {
  try {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        id: Date.now(),
        userName: formData.name.toLowerCase().replace(/\s+/g, '_'),
        avatar: '',
        banner: '',
        bio: '',
        follows: [],
        friends: [],
        groups: [],
        created_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Login a user
export const loginUser = async (loginData: LoginData): Promise<User> => {
  try {
    const response = await fetch('http://localhost:8080/users');
    const users: User[] = await response.json();
    const user = users.find(user => user.email === loginData.email && user.password === loginData.password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    return user;
  } catch (error) {
    // console.error('Error:', error);
    throw error;
  }
};
