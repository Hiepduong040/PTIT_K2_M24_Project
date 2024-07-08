import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../Modal/Auth/Login';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';
import { User } from '../../../interfaces/interfaces'; 
import { useDispatch } from 'react-redux';
import { closeModal, setView } from '../../../store/reducers/authModalSlice';
import { Button } from 'react-bootstrap';

export default function RightContent() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSetUser = (user: User | null) => {
        setUser(user);
        if (user) {
            dispatch(closeModal()); // Đóng modal khi đăng nhập thành công
            navigate('/'); // Chuyển hướng đến trang chính
        }
    };

    const logout = () => {
        setUser(null);
        dispatch(setView('login')); // Chuyển view về login
    };

    return (
        <div className='flex justify-center items-center'>
            <AuthModal>
                <Login toggleView={() => {}} setUser={handleSetUser} />
            </AuthModal>
            <div className='flex justify-center items-center'>
                {user ? (
                    <Button
                        variant=""
                        className='w-20 ml-1.5 mt-1 hidden sm:flex w-[80px] justify-center md:w-[110px] h-7 items-center rounded-full text-white border-1 bg-blue-500 border-sky-600 hover:bg-blue-500'
                        onClick={logout}
                    >
                        Logout
                    </Button>
                ) : (
                    <AuthButtons />
                )}
            </div>
        </div>
    );
}
