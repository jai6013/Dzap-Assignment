import React from "react";
import _isEmpty from "lodash/isEmpty";
import { getErrorStringsForDuplicateAddresses } from "../helpers/helper";
import errorImage from "../../src/assets/warning.png";

const Error = ({
  error,
  text,
  onClickCombineAddresses,
  onClickKeepFirstOne,
}) => {
  const { duplicateAddressVsLines = {} } = error;
  if (!_isEmpty(duplicateAddressVsLines)) {
    const errorStringsForDuplicateAddresses =
      getErrorStringsForDuplicateAddresses(duplicateAddressVsLines);

    return (
      <div className="errorBoxContainer">
        <div className="dupButtonContainer">
          <div>Duplicated</div>
          <div className="methodBtn">
            <button
              className="firstBtn"
              onClick={() => onClickKeepFirstOne(text, duplicateAddressVsLines)}
            >
              Keep the first one
            </button>
            <button
              onClick={() =>
                onClickCombineAddresses(text, duplicateAddressVsLines)
              }
            >
              Combine balance
            </button>
          </div>
        </div>
        <div className="errorContainer">
          <img src={errorImage} alt="error" />
          <div>
            {!_isEmpty(errorStringsForDuplicateAddresses) &&
              errorStringsForDuplicateAddresses.map((e) => <div>{e}</div>)}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="errorContainer">
        <img src={errorImage} alt="error" />
        <div>{!_isEmpty(error) && error.map((e) => <div>{e}</div>)}</div>
      </div>
    );
  }
};

export default Error;
