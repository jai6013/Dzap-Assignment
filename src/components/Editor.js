import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml.js";
import "codemirror/theme/juejin.css";
import "../App.css";
import { Controlled as ControlledEditor } from "react-codemirror2";

const CodeEditor = ({ text, onChange }) => {
  return (
    <ControlledEditor
      onBeforeChange={onChange}
      value={text}
      options={{
        lineNumbers: true,
        matchBrackets: true,
        mode: "xml",
        theme: "dracula",
      }}
    />
  );
};

export default CodeEditor;
