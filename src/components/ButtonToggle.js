import React, { useState } from "react";
import { Button } from "~/components";

function ButtonToggle({ buttonTextLeft, buttonTextRight }) {
  const [activeButtonLeft, setActiveButtonLeft] = useState(true);
  const [activeButtonRight, setActiveButtonRight] = useState(false);

  function handleChange(e) {
    console.log("Target: ", e.target.name);
    console.log("Target value: ", e.target.value);

    if (activeButtonRight) {
      setActiveButtonLeft(true);
      setActiveButtonRight(false);
    } else if (activeButtonLeft) {
      setActiveButtonLeft(false);
      setActiveButtonRight(true);
    }
  }

  return (
    <div className="flex">
      <Button active={activeButtonLeft} onClick={(e) => handleChange(e)}>
        {buttonTextLeft}
      </Button>
      <Button active={activeButtonRight} onClick={(e) => handleChange(e)}>
        {buttonTextRight}
      </Button>
    </div>
  );
}

export default ButtonToggle;
