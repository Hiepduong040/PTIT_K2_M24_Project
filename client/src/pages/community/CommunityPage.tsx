




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Header from '../../components/Community/Header';
// import CommunityNotFound from '../../components/Community/CommunityNotFound';
// import { fetchGroups } from '../../services/group.services';
// import { Group } from '../../interfaces/interfaces';
// import PageContentLayout from '../../layout/PageContentLayout';
// import CreatePostLink from '../../components/Community/CreatePostLink';
// import Posts from '../../components/Posts/Posts';

// export default function CommunityPage() {
//   const { groupName } = useParams<{ groupName: string }>();
//   const [group, setGroup] = useState<Group | null>(null);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadGroup = async () => {
//       try {
//         const groups = await fetchGroups();
//         const foundGroup = groups.find((g: Group) => g.groupName === groupName);
//         if (foundGroup) {
//           setGroup(foundGroup);
//         } else {
//           navigate('/community-not-found');
//         }
//       } catch (error) {
//         console.error('Failed to fetch groups', error);
//         navigate('/community-not-found');
//       } finally {
//         setLoading(false); // Set loading to false after data fetching is done
//       }
//     };

//     loadGroup();
//   }, [groupName, navigate]);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator while fetching data
//   }

//   if (!group) {
//     return <CommunityNotFound />;
//   }

//   return (
//     <div className="py-[44px]">
//       <Header communityData={group} />
//       <PageContentLayout>
//         <>
//           <div>
//             <CreatePostLink />
//             <Posts  />
//           </div>
//         </>
//         <>
//           <div>
//               {/* right trong community */}
//               {/* <About></About> */}
//           </div>
//         </>
//       </PageContentLayout>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Community/Header';
import CommunityNotFound from '../../components/Community/CommunityNotFound';
import { fetchGroups } from '../../services/group.services';
import { Group } from '../../interfaces/interfaces';
import PageContentLayout from '../../layout/PageContentLayout';
import CreatePostLink from '../../components/Community/CreatePostLink';
import Posts from '../../components/Posts/Posts';

export default function CommunityPage() {
  const { groupName } = useParams<{ groupName: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGroup = async () => {
      try {
        const groups = await fetchGroups();
        const foundGroup = groups.find((g: Group) => g.groupName === groupName);
        if (foundGroup) {
          setGroup(foundGroup);
        } else {
          navigate('/community-not-found');
        }
      } catch (error) {
        console.error('Failed to fetch groups', error);
        navigate('/community-not-found');
      } finally {
        setLoading(false);
      }
    };

    loadGroup();
  }, [groupName, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!group) {
    return <CommunityNotFound />;
  }

  return (
    <div className="py-[44px]">
      <Header communityData={group} />
      <PageContentLayout>
        <>
          <div>
            <CreatePostLink />
            <Posts communityId={group.id} />
          </div>
        </>
        <>
          <div>
            {/* right trong community */}
            {/* <About></About> */}
          </div>
        </>
      </PageContentLayout>
    </div>
  );
}
