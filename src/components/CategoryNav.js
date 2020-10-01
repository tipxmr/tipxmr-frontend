// ------------ INFO ------------
// CategoryNav renders all NavItems and styles active category
import React from "react";
import clsx from "clsx";

function NavItem({ children, activeCategory, stateSetter }) {
  const pillStyle = clsx(
    "inline-block",
    "rounded",
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
    <div className="border-b pb-2">
      <ul className="flex justify-around items-center">
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
    </div>
  );
}

export default CategoryNav;
