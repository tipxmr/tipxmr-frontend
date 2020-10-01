// ------------ INFO ------------
// CategoryNav renders all NavItems and styles active category
import React from "react";
import clsx from "clsx";
import tipxmr from "~/images/tipxmr-button.png";

function NavItem({ children, activeCategory, stateSetter }) {
  const pillStyle = clsx(
    // "inline-block",
    "rounded",
    "text-xs",
    "m-1",
    "py-1",
    "px-3",
    "transition",
    "ease-in-out",
    "duration-500",
    {
      border: children === activeCategory,
      "border-xmrorange": children === activeCategory,
      "text-white": children === activeCategory,
      "bg-xmrorange": children === activeCategory,
    }
  );

  function handleChange(children) {
    stateSetter(children);
  }

  if (children === activeCategory) {
    return (
      <li onClick={() => handleChange(children)} className={pillStyle}>
        {children}
      </li>
    );
  } else {
    return (
      <li className={pillStyle} onClick={() => handleChange(children)}>
        {children}
      </li>
    );
  }
}

function CategoryNav({ activeCategory, categories, stateSetter }) {
  return (
    <div class="h-full flex flex-grow bg-gray-200">
      {/*<!-- container -->*/}

      <aside class="flex flex-col items-center align-middle bg-gray-200 text-gray-700 shadow h-full">
        {/*<!-- Side Nav Bar-->*/}

        <div class="h-16 flex items-center w-full mb-5">
          <img src={tipxmr} className="w-24 mx-3 rounded" />
        </div>

        {/*<!-- Items Section -->*/}
        <ul className="space-y-5">
          {categories.map((category) => {
            return (
              <NavItem
                key={category}
                activeCategory={activeCategory}
                stateSetter={stateSetter}
              >
                {category}
              </NavItem>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

export default CategoryNav;
