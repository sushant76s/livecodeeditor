// import React, { useEffect, useState } from "react";
// // import PropTypes from "prop-types";
// import CodeMirror from "@uiw/react-codemirror";
// // import { javascript } from "@codemirror/lang-javascript";
// import { githubDark, githubLight } from "@uiw/codemirror-theme-github";

// function CodeEditor({ editorTheme, fontSize, socketRef, roomId, codeRef }) {
//   const [value, setValue] = useState("console.log('hello world!');");

//   useEffect(() => {
//     if (socketRef.current) {
//       socketRef.current.on("code-change", ({ code }) => {
//         if (code != null) {
//           codeRef.current = code;
//           setValue(code);
//         }
//       });
//     }

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.off("code-change");
//       }
//     };
//   }, [roomId, socketRef.current]);

//   const onChange = (val, viewUpdate) => {
//     if (socketRef.current) {
//       socketRef.current.emit("code-change", {
//         roomId,
//         code: val,
//       });
//     }
//   };

//   const options = {
//     value,
//     height: "550px",
//     theme: editorTheme === "dark" ? githubDark : githubLight,
//     onChange,
//     style: {
//       fontSize,
//     },
//   };

//   return (
//     <CodeMirror
//       //   value={value}
//       //   height="608px"
//       //   theme={editorTheme === "dark" ? githubDark : githubLight}
//       //   //   extensions={[javascript({ jsx: true })]}
//       //   onChange={onChange}
//       {...options}
//     />
//   );
// }

// // CodeEditor.propTypes = {
// //   theme: PropTypes.string,
// //   fontSize: PropTypes.string,
// // };
// export default CodeEditor;

// import { Controlled as CodeMirror } from "react-codemirror2";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";

// // Add modes (language support) as needed
// import "codemirror/mode/javascript/javascript"; // JavaScript support
// import "codemirror/mode/xml/xml"; // HTML/XML support
// import "codemirror/mode/css/css"; // CSS support

import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
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
  }, [roomId, socketRef.current, codeRef]);

  const onChange = (val) => {
    if (socketRef.current) {
      socketRef.current.emit("code-change", {
        roomId,
        code: val,
      });
    }
    codeRef.current = val;
  };

  const options = {
    value,
    height: "500px",
    theme: editorTheme === "dark" ? githubDark : githubLight,
    onChange,
    style: {
      fontSize,
    },
  };

  return <CodeMirror {...options} />;
}

export default CodeEditor;
