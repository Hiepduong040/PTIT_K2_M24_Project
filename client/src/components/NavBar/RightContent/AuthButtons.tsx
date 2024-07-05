// AuthButtons.js
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/reducers/authModalSlice';
import Button from 'react-bootstrap/Button';

const AuthButtons = () => {
  const dispatch = useDispatch();

  return (
    <div className='flex gap-x-1 justify-center items-center'>
      <Button
        variant=""
        className='w-20 mt-1 hidden sm:flex w-[70px] justify-center md:w-[110px] h-7 items-center ml-1 rounded-full text-blue border-1 border-sky-600 hover:bg-blue-500'
        onClick={() => dispatch(openModal('login'))}
      >
        Log In
      </Button>
      <Button
        variant=""
        className='w-20 mt-1 hidden sm:flex w-[80px] justify-center md:w-[110px] h-7 items-center rounded-full text-white border-1 bg-blue-500 border-sky-600 hover:bg-blue-500'
        onClick={() => dispatch(openModal('signup'))}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
