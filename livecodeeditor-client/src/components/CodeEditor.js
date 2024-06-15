import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";

function CodeEditor({ editorTheme, fontSize, socketRef, roomId, codeRef }) {
  const [value, setValue] = useState("console.log('hello world!');");

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("code-change", ({ code }) => {
        if (code != null) {
          codeRef.current = code;
          setValue(code);
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("code-change");
      }
    };
  }, [roomId, socketRef.current]);

  const onChange = (val, viewUpdate) => {
    if (socketRef.current) {
      socketRef.current.emit("code-change", {
        roomId,
        code: val,
      });
    }
  };

  const options = {
    value,
    height: "550px",
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
