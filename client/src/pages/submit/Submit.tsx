import React from 'react';
import PageContentLayout from '../../layout/PageContentLayout';
import NewPostForm from '../../components/Posts/NewPostForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Submit() {
  const user = useSelector((state: RootState) => state.user.user);
  const communityId = Number(localStorage.getItem('communityId'));

  return (
    <div className="flex flex-col justify-center min-h-[60vh]">
      <PageContentLayout>
        <>
          <h3>Create a post</h3>
          {user && <NewPostForm communityId={communityId} user={user} />}
        </>
        <>
          {/* <About></About> */}
        </>
      </PageContentLayout>
    </div>
  );
};
