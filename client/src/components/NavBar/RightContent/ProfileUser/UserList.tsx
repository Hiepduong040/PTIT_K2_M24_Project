import React from "react";
import { Dropdown } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../../../store/reducers/authSlice";
import { Link } from "react-router-dom";
import { RootState } from "../../../../store/store";

export default function UserList() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const logout = async () => {
    dispatch(logoutAction());
    localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage khi logout
  };

  return (
    <>
      {user?.id === 1111111111111 ? (
        <>
          <Dropdown.Item className="text-sm font-semibold hover:bg-blue-500 hover:text-white">
            <Link to={"/admin"}>
              <div className="flex items-center">
                <CgProfile className="text-xl mr-2" />
                Admin
              </div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="text-sm font-semibold hover:bg-blue-500 hover:text-white">
            <Link to={"/profile-user"}>
              <div className="flex items-center">
                <CgProfile className="text-xl mr-2" />
                Profile
              </div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
        </>
      ) : (
        <>
          <Dropdown.Item className="text-sm font-semibold hover:bg-blue-500 hover:text-white">
            <Link to={"/profile-user"}>
              <div className="flex items-center">
                <CgProfile className="text-xl mr-2" />
                Profile
              </div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
        </>
      )}
      <Dropdown.Item className="text-sm font-semibold hover:bg-blue-500 hover:text-white" onClick={logout}>
        <div className="flex items-center">
          <MdOutlineLogin className="text-xl mr-2" />
          Log Out
        </div>
      </Dropdown.Item>
    </>
  );
}
