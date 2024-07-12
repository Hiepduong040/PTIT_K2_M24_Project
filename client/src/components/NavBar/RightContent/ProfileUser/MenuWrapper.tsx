import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { RootState } from "../../../../store/store";
import UserList from "./UserList";
import NoUserList from "./NoUserList";

export default function MenuWrapper() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-basic"
        className="flex items-center px-2 py-1 rounded hover:outline hover:outline-gray-200"
        style={{ background: 'none', border: 'none' }}
      >
        <div className="flex items-center">
          {user ? (
            <>
              <FaRedditSquare className="text-2xl mr-1 text-gray-300" />
              <div className="hidden lg:flex flex-col text-sm items-start mr-8">
                <span className="font-bold text-black">
                  {user.displayName || user.email.split("@")[0]}
                </span>
              </div>
            </>
          ) : (
            <VscAccount className="text-2xl mr-1 text-gray-400" />
          )}
        </div>
        <i className="bi bi-chevron-down text-gray-500"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {user ? <UserList /> : <NoUserList setModalState={() => {}} />}
      </Dropdown.Menu>
    </Dropdown>
  );
}


