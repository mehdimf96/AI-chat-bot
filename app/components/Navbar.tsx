import { PanelRightOpen } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 ">
      <div className=" flex items-center space-x-4">
        <PanelRightOpen className="cursor-pointer" />
        <div className="h-6 w-px bg-gray-300" />
        <button
          className="px-3 py-1 bg-gray-900 text-black rounded-md text-sm"
          style={{ backgroundColor: "#59c6d0" }}
        >
          + New Chat
        </button>
      </div>
      <button className="px-3 py-1 bg-white text-white rounded-md text-sm">
        + New Chat
      </button>
    </div>
  );
};

export default Navbar;
