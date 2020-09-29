import React, { useState } from "react";
import { CategoryCard, CategoryNav } from "~/components";

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
  const pictureLink = "https://i.imgur.com/8rU7ruv.jpeg";
  // TODO implement category pictures
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <div className="w-3/4 mx-auto">
      <div className="my-5">
        <h2 className="underline text-center text-2xl mb-3">
          Checkout these categories
        </h2>
        <CategoryNav
          active={activeCategory}
          stateSetter={setActiveCategory}
          categories={categories}
        />
      </div>
      <div className="grid gird-cols-1 md:grid-cols-4">
        {categories.map((category) => {
          return (
            <CategoryCard
              name={category}
              key={category}
              numStreamers={numStreamers}
              languages={languages}
              pictureLink={pictureLink}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
