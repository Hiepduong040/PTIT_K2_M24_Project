import React, { useState, useEffect } from 'react';
import { GrAdd } from 'react-icons/gr';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreateCommunityModal from '../../Modal/CommunitiesModal/CreateComminityModal';
import { fetchGroups } from '../../../services/group.services';
import { Group } from '../../../interfaces/interfaces';

type CommunitiesProps = {
  menuOpen: boolean;
};

export default function Communities({ menuOpen }: CommunitiesProps) {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const userId = "123"; 
  const navigate = useNavigate();

  const loadGroups = async () => {
    try {
      const data = await fetchGroups();
      setGroups(data);
    } catch (error) {
      console.error("Failed to fetch groups", error);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  // Handle group creation and refresh group list
  const handleGroupCreated = () => {
    setOpen(false);
    loadGroups();
  };

  // Handle navigation to community and save communityId to localStorage
  const handleGroupClick = (communityId: number, groupName: string) => {
    localStorage.setItem('communityId', communityId.toString());
    navigate(`/page/${groupName}`);
    window.location.reload();
  };

  return (
    <>
      <CreateCommunityModal
        isOpen={open}
        handleClose={() => setOpen(false)}
        userId={userId}
        onGroupCreated={handleGroupCreated}
      />
      <div className="mt-3 mb-4">
        <p className="pl-3 mb-1 text-xs font-semibold text-gray-500">
          MY COMMUNITIES
        </p>
        
        <Dropdown.Item
          className="w-full text-base hover:bg-gray-100"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <GrAdd className="text-lg mr-2" />
            Create Community
          </div>
        </Dropdown.Item>
        {groups.map((group) => (
          <p 
            key={group.id} 
            className="pl-6 ml-4 mb-1 text-base cursor-pointer"
            onClick={() => handleGroupClick(group.id, group.groupName)}
          >
            {group.groupName}
          </p>
        ))}
      </div>
    </>
  );
}
