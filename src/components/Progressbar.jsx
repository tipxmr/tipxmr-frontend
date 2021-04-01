import PropTypes from "prop-types";

const Status = ({ isActive, isDone }) => {
  let status = "";

  if (isActive) {
    if (isDone) {
      status = "sync completed";
    } else {
      status = "syncing";
    }
  } else {
    status = "sync stopped";
  }

  return (
    <span className="text-xs text-white font-semibold inline-block py-1 px-2 uppercase rounded-full tracking-tight bg-xmrorange-lightest">
      {status}
    </span>
  );
}

const Percentage = ({ value }) => {
  return (
    <span className="text-xs font-semibold inline-block text-green-500">
      {value}%
    </span>
  );
}

const Progress = ({ value }) => {
  const barStyles = { width: value + "%" };

  return (
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
      <div
        style={barStyles}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-xmrorange-lightest"
      ></div>
    </div>
  );
}

const ProgressIndicator = ({ percentage, isSyncActive, isSynced }) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <Status isActive={isSyncActive} isDone={isSynced} />
        </div>
        <div className="text-right">
          <Percentage value={percentage} />
        </div>
      </div>
      <Progress value={percentage} />
    </div>
  );
}
ProgressIndicator.propTypes = {
  percentage: PropTypes.number,
  isSyncActive: PropTypes.bool,
  isSynced: PropTypes.bool,
};

export default ProgressIndicator;
