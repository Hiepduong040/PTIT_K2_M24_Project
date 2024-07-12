import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Community = {
  id: number;
  name: string;
  description: string;
};

type SearchCommunitiesProps = {
  searchTerm: string;
  communities: Community[];
};

export default function SearchCommunities({ searchTerm, communities }: SearchCommunitiesProps) {
  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase() === searchTerm.toLowerCase()
  );

  return (
    <div>
      <h2 className="text-2xl mb-4">Communities matching "{searchTerm}"</h2>
      {filteredCommunities.length > 0 ? (
        filteredCommunities.map(community => (
          <div key={community.id} className="px-10 py-10 rounded-xl mb-3 shadow-sm bg-orange-400">
            <div className="card-body d-flex align-items-center">
              <div className="flex-grow-1">
                <h5 className="card-title mb-0">{community.name}</h5>
                <p>{community.description}</p>
                <Link to={`/community/${community.name}`}>
                  <Button variant="primary">Visit Community</Button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No communities found matching "{searchTerm}".</p>
      )}
    </div>
  );
}
