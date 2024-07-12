import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar, faPlus, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { GrAdd } from 'react-icons/gr';
import { FaUserFriends } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import CreateCommunityModal from '../Modal/CommunitiesModal/CreateComminityModal'; // Update path if needed
import { fetchGroups } from '../../services/group.services'; // Update path if needed
import { Group } from '../../interfaces/interfaces'; // Update path if needed

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const userId = "123"; // Replace with actual userId
  const navigate = useNavigate(); // Initialize navigate

  // Fetch groups from the server
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

  // Handle navigation to community details
  const handleGroupClick = (groupId: number, groupName: string) => {
    localStorage.setItem('communityId', groupId.toString());
    navigate(`/page/${groupName}`);
  };
  

  return (
    <div className="fixed top-10 left-0 w-64 h-full bg-white shadow-md z-40">
      <div className="px-4 py-6">
        <Link to={'/'}>
          <div className="flex items-center space-x-4 mb-6">
            <FontAwesomeIcon icon={faHome} />
            <span className="font-semibold text-lg">Home</span>
          </div>
        </Link>
        <div className="flex items-center space-x-4 mb-6">
          <FontAwesomeIcon icon={faStar} />
          <span className="font-semibold text-lg">Popular</span>
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <FontAwesomeIcon icon={faArrowDown} />
          <span className="font-semibold text-lg">All</span>
        </div>
        <div className="border-t border-gray-300 mt-6"></div>
        <div className="flex items-center  space-x-4 mt-6 cursor-pointer" >
          <FaUserFriends />
          <span className="font-semibold text-lg">Friends</span>
        </div>
       
          <div className="flex items-center space-x-4 mb-6">
            <img src="path_to_icon" alt="AskReddit" className="h-6 w-6" />
            <span className="text-lg">Hiệp</span>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <img src="path_to_icon" alt="AskReddit" className="h-6 w-6" />
            <span className="text-lg">Long</span>
          </div>
         
        
        <div className="border-t border-gray-300 mt-6"></div>
        <div className="mt-6">
          <div className="font-semibold text-lg mb-2">Communities</div>
          <div className="flex items-center space-x-4 mb-6 cursor-pointer" onClick={() => setOpen(true)}>
            <GrAdd className="text-lg mr-2" />
            <span className="text-lg">Create a community</span>
          </div>
          {groups.map((group) => (
            <div className="flex items-center space-x-4 mb-6 cursor-pointer" key={group.id} onClick={() => handleGroupClick(group.id, group.groupName)}>
              <img src={group.group_picture || 'default_image_path'} alt={group.groupName} className="h-6 rounded-full w-6" />
              <span className="text-lg"
                
              >{group.groupName}</span>
            </div>
          ))}
        </div>
      </div>
      <CreateCommunityModal
        isOpen={open}
        handleClose={() => setOpen(false)}
        userId={userId}
        onGroupCreated={handleGroupCreated}
      />
    </div>
  );
}



