import React from "react";
import PropTypes from "prop-types";
import tipxmr from "~/images/tipxmr-button.png";
import { Link } from "react-router-dom";

function Flags({ languages }) {
  let flags = [];
  flags = languages.map((language) => {
    switch (language) {
      case "German":
        return "🇩🇪 ";
      case "French":
        return "🇲🇫 ";
      case "Esperanto":
        return "🏴‍☠️ ";
      case "Spanish":
        return "🇪🇦 ";
      case "Russian":
        return "🇷🇺 ";
      case "Italian":
        return "🇮🇹 ";
      case "Japanese":
        return "🇯🇵 ";
      case "Portuguese":
        return "🇵🇹 ";
      case "Dutch":
        return "🇳🇱 ";
      default:
        return "🇬🇧 ";
    }
  });
  return <div className="flex justify-center text-xl">{flags}</div>;
}

function CategoryCard({ name, numStreamers, languages, pictureLink }) {
  return (
    <div className="mx-4">
      <Link to={`/categories/${name}`}>
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
          <img
            className="w-full h-56 object-cover object-center"
            src={pictureLink}
            alt="avatar"
          />
          <div className="py-4 px-6">
            <div className="flex justify-center items-center transform hover:scale-110">
              <h1 className="mx-5 text-2xl text-xmrgray-darker">#{name}</h1>
            </div>
            <div className="p-3 my-4 rounded bg-gray-200 text-xmrgray-darker shadow-md">
              <p className="text-center text-sm">
                <span className="text-xl">{numStreamers}</span> online
              </p>
              <Flags languages={languages} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

CategoryCard.propTypes = {
  name: PropTypes.string,
  numStreamers: PropTypes.number,
  languages: PropTypes.array,
};
export default CategoryCard;
