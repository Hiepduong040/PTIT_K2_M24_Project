import React, { useEffect, useState } from 'react';
import { FaReddit } from 'react-icons/fa';
import { Group } from '../../interfaces/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateGroup } from '../../services/group.services';
import { Link } from 'react-router-dom';
import UploadImage from '../uploadImage/UploadImage';

export default function Header({ communityData }: { communityData: Group }) {
  const { groupName, id, members } = communityData;
  const [groupPicture, setGroupPicture] = useState(communityData.group_picture);
  const [banner, setBanner] = useState(communityData.banner);
  const user = useSelector((state: RootState) => state.user.user);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const isMember = members.some((member) => member.userId === user.id);
      setIsJoined(isMember);
    } else {
      setIsJoined(false);
    }
  }, [user, members]);

  const handleJoinLeave = async () => {
    if (!user) return;

    setLoading(true);
    let updatedMembers: { userId: number; join_at: string }[] = [];
    if (isJoined) {
      updatedMembers = members.filter((member) => member.userId !== user.id);
    } else {
      updatedMembers = [...members, { userId: user.id, join_at: new Date().toISOString() }];
      updatedMembers = updatedMembers.reduce((unique: { userId: number; join_at: string }[], o) => {
        if (!unique.some(obj => obj.userId === o.userId)) {
          unique.push(o);
        }
        return unique;
      }, []);
    }

    try {
      const updatedGroup = await updateGroup(id, { members: updatedMembers });
      setIsJoined(!isJoined);
      console.log(`Number of members in ${groupName}:`, updatedMembers.length);
    } catch (error) {
      console.error('Failed to update group', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (url: string) => {
    try {
      await updateGroup(id, { group_picture: url });
      setGroupPicture(url);  // Update avatar URL in state
    } catch (error) {
      console.error('Failed to update group avatar', error);
    }
  };

  const handleBannerUpload = async (url: string) => {
    try {
      await updateGroup(id, { banner: url });
      setBanner(url);  // Update banner URL in state
    } catch (error) {
      console.error('Failed to update group banner', error);
    }
  };

  return (
    <div className="flex flex-col ml-[150px] w-full h-36 md:h-[650px]">
      <img
        src={banner}
        className="object-cover w-full h-[350px] md:w-[950px] md:ml-52 absolute bg-blue-400 rounded-b-lg"
      />
      <div className='absolute ml-[1233px] mb-[330px] text-xl left-4 text-white bottom-4 hover:text-gray-700 cursor-pointer '>
        <UploadImage onUpload={handleBannerUpload} type="banner" />
      </div>
      <div className="flex py-20 justify-center bg-gradient-to-b from-blue-900 to-white pt-28 md:pt-96 h-1/2">
        <div className="flex w-11/12 md:w-[95%] max-w-[860px]">
          {groupPicture ? (
            <img
              className="absolute w-16 h-16 md:w-32 md:h-32 border-4 border-white rounded-full -mt-8 md:-mt-16"
              src={groupPicture}
              alt={groupName}
            />
          ) : (
            <FaReddit className="absolute w-16 h-16 md:w-32 md:h-32 text-blue-500 text-4xl border-4 border-white rounded-full -mt-8 md:-mt-16" />
          )}
          <div className='absolute ml-[510px] mb-[215px] text-xl left-20 bottom-4 text-white hover:text-gray-700 cursor-pointer'> 
            <UploadImage onUpload={handleAvatarUpload} type="avatar" />
          </div>
          <div className="flex p-0">
            <div className="flex flex-col ml-36 mr-6">
              <span className="font-extrabold text-lg md:text-2xl">{groupName}</span>
              <span className="font-semibold text-sm md:text-lg text-gray-400">
                r/{groupName}
              </span>
            </div>
            <div className="flex">
              <button
                className="btn btn-primary h-8 md:h-10 px-6 py-0 rounded-full"
                onClick={handleJoinLeave}
                disabled={loading}
              >
                {isJoined ? 'Joined' : 'Join'}
              </button>
              {isJoined && (
                <Link to={`/page/${groupName}/submit`} className="btn btn-primary py-2 mt-[0px] ml-[145px] h-8 md:h-10 px-6 py-0 rounded-full ml-2">
                  Create Post
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


