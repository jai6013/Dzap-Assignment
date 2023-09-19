import React from "react";
import _isEmpty from "lodash/isEmpty";
import { getErrorStringsForDuplicateAddresses } from "../helpers/helper";

const Error = ({
  error,
  text,
  onClickCombineAddresses,
  onClickKeepFirstOne
}) => {
  const { duplicateAddressVsLines = {} } = error;
  if (!_isEmpty(duplicateAddressVsLines)) {
    const errorStringsForDuplicateAddresses = getErrorStringsForDuplicateAddresses(
      duplicateAddressVsLines
    );

    return (
      <div className="errorBoxContainer">
        <div className="dupButtonContainer">
          <div>Duplicate</div>
          <div>
            <button
              onClick={() =>
                onClickCombineAddresses(text, duplicateAddressVsLines)
              }
            >
              Combine balance
            </button>
            |
            <button
              onClick={() => onClickKeepFirstOne(text, duplicateAddressVsLines)}
            >
              Keep the first one
            </button>
          </div>
        </div>
        <div className="errorContainer">
          <img
            src="https://cdn.icon-icons.com/icons2/2440/PNG/512/error_icon_148538.png"
            alt="error"
          />
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
        <img
          src="https://cdn.icon-icons.com/icons2/2440/PNG/512/error_icon_148538.png"
          alt="error"
        />
        <div>{!_isEmpty(error) && error.map((e) => <div>{e}</div>)}</div>
      </div>
    );
  }
};

export default Error;
