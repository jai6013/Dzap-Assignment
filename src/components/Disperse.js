import React, { useCallback, useState } from "react";
import _isEmpty from "lodash/isEmpty";

import Editor from "./Editor";
import Error from "./Error";
import {
  getCombinedAddresses,
  getErrorForAmounts,
  getErrorForDuplicateAddresses,
  getErrorForInvalidAddresses,
  getKeepFirstOneAddresses
} from "../helpers/helper";
import "../App.css";

const Disperse = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState({});

  const handleOnclick = useCallback(() => {
    // set Error for in-valid address
    let errorForInvalidAddresses = getErrorForInvalidAddresses(text);
    if (!_isEmpty(errorForInvalidAddresses)) {
      setError(errorForInvalidAddresses);
      return;
    }

    // set Error for amounts
    let errorForAmounts = getErrorForAmounts(text);
    if (!_isEmpty(errorForAmounts)) {
      setError(errorForAmounts);
      return;
    }

    // set Error for duplicate addresses
    let errorForDuplicateAddresses = getErrorForDuplicateAddresses(text);
    if (!_isEmpty(errorForDuplicateAddresses?.duplicateAddressVsLines)) {
      setError(errorForDuplicateAddresses);
      return;
    }

    // success logic
    alert("Success, Every entry is correct");
    setText("");
    setError({});
  }, [text]);

  const handleOnchange = useCallback((Editor, data, value) => {
    setText(value);
  }, []);

  const onClickCombineAddresses = (txt, dupAddressVsLines) => {
    const combinedAddressesText = getCombinedAddresses(txt, dupAddressVsLines);
    setText(combinedAddressesText);
    setError({});
  };
  const onClickKeepFirstOne = (txt, dupAddressVsLines) => {
    const keepFirstOneAddressesText = getKeepFirstOneAddresses(
      txt,
      dupAddressVsLines
    );
    setText(keepFirstOneAddressesText);
    setError({});
  };
  return (
    <div className="appContainer">
      <Editor text={text} onChange={handleOnchange} />
      <div className="inputRule">Separated by ',' or '' or '='</div>
      {!_isEmpty(error) ? (
        <Error
          error={error}
          text={text}
          handleOnchange={handleOnchange}
          onClickCombineAddresses={onClickCombineAddresses}
          onClickKeepFirstOne={onClickKeepFirstOne}
        />
      ) : (
        <div></div>
      )}
      <button className="submitButton" onClick={handleOnclick}>
        Next
      </button>
    </div>
  );
};

export default Disperse;
