import React from "react";
import clsx from "clsx";

// TODO create the functionality to switch the active pill
// TODO nice to have: create an animation for switching the pill
// TODO render the category page with a filter
function CategoryNav({ state, stateSetter, categories }) {
  const pillStyle = clsx("inline-block", "border", "rounded", "py-1", "px-3", {
    // TODO create  function that compares that active state to the name of the pill and let clsx render accordingly
    "border-blue-500": active,
    "text-white": active,
    "bg-blue-500": active,
  });

  function NavItem({ name }) {
    return (
      <li className="mr-3">
        <a
          /* className="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" */
          className={pillStyle}
          href="#"
        >
          {name}
        </a>
      </li>
    );
  }

  return (
    <div>
      <ul className="flex justify-center">
        {categories.map((category) => {
          <NavItem name={category} />;
        })}
      </ul>{" "}
    </div>
  );
}

export default CategoryNav;
