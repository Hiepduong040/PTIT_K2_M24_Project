import { Group } from '../interfaces/interfaces';

// Fetch groups from the server
export const fetchGroups = async (): Promise<Group[]> => {
  try {
    const response = await fetch("http://localhost:8080/groups");
    if (!response.ok) {
      throw new Error("Failed to fetch groups.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch groups", error);
    throw error;
  }
};

// Create a new group
export const createGroup = async (newGroup: Group): Promise<Group> => {
  try {
    const response = await fetch("http://localhost:8080/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGroup),
    });

    if (!response.ok) {
      throw new Error("Failed to create community.");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create group", error);
    throw error;
  }
};

// Update a group
export const updateGroup = async (groupId: number, updatedData: Partial<Group>): Promise<Group> => {
  try {
    const response = await fetch(`http://localhost:8080/groups/${groupId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      throw new Error('Failed to update group.');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update group', error);
    throw error;
  }
};
