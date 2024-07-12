import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsHouseDoorFill, BsBoxArrowRight } from 'react-icons/bs';
import { IoLogoReddit } from 'react-icons/io';

export default function SideBarAdmin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload(); 
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : "sidebar"}>
      <div className='sidebar-title text-red-500'>
        <div className='sidebar-brand'>
          <IoLogoReddit className='icon_header' onClick={toggleSidebar} />
          <span className='text'>Reddit</span>
        </div>
        <div className='icon close_icon' onClick={toggleSidebar}>X</div>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/admin">
            <BsGrid1X2Fill className='icon' />
            <span className='text'>Dashboard</span>
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin/users">
            <BsPeopleFill className='icon' />
            <span className='text'>User</span>
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin/posts">
            <BsFillGrid3X3GapFill className='icon' />
            <span className='text'>Post</span>
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin/groups">
            <BsFillArchiveFill className='icon' />
            <span className='text'>Group</span>
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin/comments">
            <BsListCheck className='icon' />
            <span className='text'>Comment</span>
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin/reports">
            <BsMenuButtonWideFill className='icon' />
            <span className='text'>Reports</span>
          </Link>
        </li>
        <li className='sidebar-list-item relative'>
          <div onClick={() => setShowSettings(!showSettings)} className='cursor-pointer flex items-center'>
            <BsFillGearFill className='icon' />
            <span className='text'>Settings</span>
          </div>
          {showSettings && (
            <ul className='absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden'>
              <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center' onClick={handleBackHome}>
                <BsHouseDoorFill className='mr-2' />
                Back Home Reddit
              </li>
              <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center' onClick={handleLogout}>
                <BsBoxArrowRight className='mr-2' />
                Logout
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}
