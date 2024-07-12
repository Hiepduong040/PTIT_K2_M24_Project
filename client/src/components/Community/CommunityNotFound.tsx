import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CommunityNotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh]">
      Sorry, that community does not exist or has been banned
      <Link to="/">
        <Button className="mt-4">GO HOME</Button>
      </Link>
    </div>
  );
}
