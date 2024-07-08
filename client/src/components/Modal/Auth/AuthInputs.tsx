import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../../../store/reducers/authModalSlice';
import Login from './Login';
import SignUp from './Signup';
import { User } from '../../../interfaces/interfaces';

const AuthInputs = () => {
  const { view } = useSelector((state: any) => state.authModal);
  const dispatch = useDispatch();

  const toggleView = (view: 'login' | 'signup') => {
    dispatch(setView(view));
  };

  return (
    <div className="flex flex-col items-center w-full mt-4">
      {view === 'login' ? (
        <Login toggleView={toggleView} setUser={(user: User | null) => {}} />
      ) : (
        <SignUp toggleView={toggleView} />
      )}
    </div>
  );
};

export default AuthInputs;
