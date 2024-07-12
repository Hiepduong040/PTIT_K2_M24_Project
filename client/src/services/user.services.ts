import axios from 'axios';
import { User } from '../interfaces/interfaces'; // Adjust path as needed

export const updateUserProfile = async (userId: number, updates: Partial<User>): Promise<User> => {
  const response = await axios.patch(`http://localhost:8080/users/${userId}`, updates);
  return response.data;
};
