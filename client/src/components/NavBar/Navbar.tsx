import { useSelector } from 'react-redux';
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import Sidebar from '../SideBar/Sidebar'; 
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      {user && <Sidebar />} 
      <div className='bg-white h-11 px-1.5 py-1.5 block fixed w-full z-50'>
        <div className='flex'>
            <img className='h-8' src="https://store-images.s-microsoft.com/image/apps.4416.14375561300249796.d13a74ad-ce63-46e2-8940-cdc1265dc71f.cf708543-813e-4d06-843f-3f455881562c" alt="Reddit Logo" />
            <div className='hidden md:block font-semibold text-lg mt-0.5 ml-1'>Reddit</div>
          {user && <Directory />}
          <SearchInput />
          <RightContent />
        </div>
      </div>
    </div>
  );
}
