import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { IoHome } from "react-icons/io5";
import Communities from "./Communities";

const CustomToggle = React.forwardRef(({ children, onClick }: any, ref: any) => (
  <div
    ref={ref}
    className="cursor-pointer px-2 py-1 rounded hover:outline hover:outline-gray-200 mr-2 ml-0 md:ml-2 flex items-center justify-between w-auto lg:w-52"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

export default function Directory() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <div className="flex items-center mt-1">
          <IoHome className=" mr-2 md:mr-2" />
          <div className="hidden lg:flex flex-col text-xs">
            <span className="font-semibold">
              {/* {directoryState.selectedMenuItem.displayText} */}
            </span>
          </div>
        </div>
        <FaChevronDown className="text-xs text-gray-500 mt-1.5" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="max-h-72 overflow-scroll overflow-x-hidden">
        <Communities menuOpen={false} />
      </Dropdown.Menu>
    </Dropdown>
  );
}
