import Link from "next/link";
import React from "react";

const Navbar = ({ onShowModal }) => {
  return (
    <div className="w-full h-full bg-gray-900 flex  justify-around">
      <div className=" flex items-center justify-center">
        <Link href={"/"} className="text-yellow-600 text-2xl">
          ZAHURUL.
        </Link>
      </div>
      <div className=" flex items-center justify-center">
        <button
          onClick={onShowModal}
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Add Topic
        </button>
      </div>
    </div>
  );
};

export default Navbar;
