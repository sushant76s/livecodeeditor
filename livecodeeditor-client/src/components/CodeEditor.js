import React from "react";
// import PropTypes from "prop-types";
import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";

function CodeEditor({ editorTheme, fontSize }) {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);

  const options = {
    value,
    height: "608px",
    theme: editorTheme === "dark" ? githubDark : githubLight,
    onChange,
    style: {
      fontSize,
    },
  };

  return (
    <CodeMirror
      //   value={value}
      //   height="608px"
      //   theme={editorTheme === "dark" ? githubDark : githubLight}
      //   //   extensions={[javascript({ jsx: true })]}
      //   onChange={onChange}
      {...options}
    />
  );
}

// CodeEditor.propTypes = {
//   theme: PropTypes.string,
//   fontSize: PropTypes.string,
// };
export default CodeEditor;
