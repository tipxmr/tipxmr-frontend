import PropTypes from "prop-types";
import clsx from "clsx";

const StatBox = ({ boxTitle, boxStat, textSize = "text-md" }) => {
  const boxStyles = clsx([
    "rounded",
    "shadow-lg",
    "text-center",
    "text-gray-200",
  ]);
  const textStyles = clsx([textSize]);
  return (
    <div className={boxStyles}>
      <div className="px-4 py-6">
        <p>{boxTitle}</p>
        <div className="text-4xl my-2">{boxStat}</div>
      </div>
    </div>
  );
}

StatBox.propTypes = {
  boxTitle: PropTypes.string,
  boxStat: PropTypes.string,

  // cannot really include the boxStat since it may be a string or a number (float)
};
export default StatBox;
