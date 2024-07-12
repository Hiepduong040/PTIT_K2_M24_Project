import { Dropdown } from "react-bootstrap";
import { MdOutlineLogin } from "react-icons/md";

type NoUserListProps = {
  setModalState: (value: { open: boolean, view: string }) => void;
};

export default function NoUserList({ setModalState }: NoUserListProps) {
  return (
    <>
      <Dropdown.Item
        className="text-sm font-semibold hover:bg-blue-500 hover:text-white"
        onClick={() => setModalState({ open: true, view: "login" })}
      >
        <div className="flex items-center">
          <MdOutlineLogin className="text-xl mr-2" />
          Log In / Sign Up
        </div>
      </Dropdown.Item>
    </>
  );
}

