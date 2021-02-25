import React, { useState } from "react";
import { CategoryCard, CategoryNav } from "../components";

function Categories() {
  const [categories, setCategories] = useState([
    "all",
    "gaming",
    "politics",
    "talk",
    "XXX",
  ]);
  // hardcoded numStreamers, change later
  const [numStreamers, setNumStreamers] = useState(2);
  const [languages, setLanguages] = useState(["German", "English", "French"]);
  const pictureLink = "https://i.imgur.com/8rU7ruv.jpeg";
  // TODO implement category pictures
  return (
    <div className="w-3/4 mx-auto">
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
