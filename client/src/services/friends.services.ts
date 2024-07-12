import axios from "axios";

// friends.services.ts
export type FriendRequest = {
  id: number;
  from_user_id: number;
  to_user_id: number;
  status: 'accepted' | 'notFriend' | 'requested'; // Ensure this matches the union type
  created_at: string;
};

export const getFriendRequests = async (userId: number): Promise<FriendRequest[]> => {
  const response = await axios.get<FriendRequest[]>(`http://localhost:8080/friend_requests?to_user_id=${userId}`);
  return response.data;
};

export const acceptFriendRequest = async (requestId: number, fromUserId: number, toUserId: number): Promise<void> => {
  await axios.patch(`http://localhost:8080/friend_requests/${requestId}`, { status: 'accepted' });
  // Additional logic to add to friends list, etc.
};

export const deleteFriendRequest = async (requestId: number): Promise<void> => {
  await axios.delete(`http://localhost:8080/friend_requests/${requestId}`);
};
