import React, { useState } from "react";
import { CategoryCard } from "~/components";

function Categories() {
  const [categories, setCategories] = useState([
    "gaming",
    "politics",
    "talk",
    "entertainment",
  ]);
  // hardcoded numStreamers, change later
  const [numStreamers, setNumStreamers] = useState(2);
  const [languages, setLanguages] = useState(["German", "English", "French"]);
  // TODO implement category pictures
  return (
    <div className="w-3/4 mx-auto">
      <div className="my-3">
        <h2 className="underline text-center text-2xl">
          Checkout these categories
        </h2>
      </div>
      <div className="grid gird-cols-1 md:grid-cols-4">
        {categories.map((category) => {
          return (
            <CategoryCard
              name={category}
              key={category}
              numStreamers={numStreamers}
              languages={languages}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
