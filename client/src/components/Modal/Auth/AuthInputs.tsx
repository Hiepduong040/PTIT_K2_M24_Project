import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../../../store/reducers/authModalSlice';
import { RootState } from '../../../store/store';
import Login from './Login';
import SignUp from './Signup';
import { User } from '../../../interfaces/interfaces';
import { setUser as setUserAction } from '../../../store/reducers/authSlice';

export default function AuthInputs() {
  const { view } = useSelector((state: RootState) => state.authModal);
  const dispatch = useDispatch();

  const toggleView = (view: 'login' | 'signup') => {
    dispatch(setView(view));
  };

  const setUser = (user: User | null) => {
    dispatch(setUserAction(user));
  };

  return (
    <div className="flex flex-col items-center w-full mt-4">
      {view === 'login' ? (
        <Login toggleView={toggleView} setUser={setUser} />
      ) : (
        <SignUp toggleView={toggleView} setUser={setUser} />
      )}
    </div>
  );
}



