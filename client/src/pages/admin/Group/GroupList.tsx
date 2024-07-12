import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLock, FaUnlock } from 'react-icons/fa';
import SideBarAdmin from './AdminGroupHeader';

type Group = {
  id: number;
  groupName: string;
  group_picture: string;
  banner: string;
  bio: string;
  privacyType: string;
  members: Array<{
    userId: number;
    join_at: string;
  }>;
  created_at: string;
};

export default function GroupList() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:8080/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleToggleStatus = async (group: Group) => {
    try {
      const updatedGroup = {
        ...group,
        privacyType: group.privacyType === 'private' ? 'public' : 'private'
      };
      await axios.patch(`http://localhost:8080/groups/${group.id}`, updatedGroup);
      setGroups(groups.map(g => g.id === group.id ? updatedGroup : g));
    } catch (error) {
      console.error('Error toggling group status:', error);
    }
  };

  return (
    <div className="flex">
      <SideBarAdmin />
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-6">Groups Table</h2>
        <div className="overflow-x-auto shadow-sm">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{group.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {group.group_picture && <img src={group.group_picture} alt="Group" className="w-12 h-12 rounded-full object-cover" />}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{group.groupName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{group.privacyType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(group.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold ${group.privacyType === 'private' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                      onClick={() => handleToggleStatus(group)}
                    >
                      {group.privacyType === 'private' ? <FaLock /> : <FaUnlock />}
                      <span className="ml-2">{group.privacyType === 'private' ? 'Lock' : 'Unlock'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
