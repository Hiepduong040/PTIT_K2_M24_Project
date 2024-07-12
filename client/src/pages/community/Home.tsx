import React from 'react';
import Posts from '../../components/Posts/Posts';
import PageContentLayout from '../../layout/PageContentLayout';
import CreatePostLink from '../../components/Community/CreatePostLink';
import RightPanel from './RightPanel';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh]">
      <PageContentLayout>
        <>
          <div>
            <CreatePostLink />
            <Posts communityId={0} />
          </div>
        </>
        <>
          <div>
            {user && <RightPanel />}
          </div>
        </>
      </PageContentLayout>
    </div>
  );
}
