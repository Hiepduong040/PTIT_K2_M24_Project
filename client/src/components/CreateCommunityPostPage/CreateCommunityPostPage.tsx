import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import About from "../About/About";
import PageContentLayout from "../../layout/PageContentLayout";
import NewPostForm from "../Post/NewPostForm";
import { setCurrentCommunity } from "../../store/reducers/communitySlice";

const CreateCommmunityPostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loadingUser } = useSelector((state:any) => state.auth);
  const communityStateValue = useSelector((state:any) => state.community);

  useEffect(() => {
    if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
      navigate(`/community/${communityStateValue.currentCommunity.id}`);
    }
  }, [user, loadingUser, communityStateValue.currentCommunity, navigate]);

  return (
    <PageContentLayout maxWidth="1060px">
      <div className="border-b border-white p-4">
        <h2 className="font-semibold">Create a post</h2>
      </div>
      {user && (
        <NewPostForm
          communityId={communityStateValue.currentCommunity.id}
          communityImageURL={communityStateValue.currentCommunity.imageURL}
          user={user}
        />
      )}
      {communityStateValue.currentCommunity && (
        <About
          communityData={communityStateValue.currentCommunity}
          pt={6}
          onCreatePage
          loading={communityStateValue.loading}
        />
      )}
    </PageContentLayout>
  );
};

export default CreateCommmunityPostPage;
