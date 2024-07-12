import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import AuthModal from '../../Modal/Auth/AuthModal';
import { closeModal, setView } from '../../../store/reducers/authModalSlice';
import { logout, setUser } from '../../../store/reducers/authSlice'; // Import chính xác hàm logout
import { Button } from 'react-bootstrap';
import AuthButtons from './AuthButtons';
import Icons from './Icons';
import MenuWrapper from './ProfileUser/MenuWrapper';

export default function RightContent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state: RootState) => state.user);
    const user = userState.user;

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser))); // Khởi tạo người dùng từ localStorage
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(setView('login')); // Chuyển view về login
        navigate('/'); // Chuyển hướng đến trang chính
    };

    return (
        <div className='flex justify-center items-center'>
            <AuthModal />
            <div className='flex justify-center items-center'>
                {user ? (
                    <>
                        <Icons />
                        <MenuWrapper />
                    </>
                ) : (
                    <AuthButtons />
                )}
            </div>
        </div>
    );
}
