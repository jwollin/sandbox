"use client";

import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

function CodeEditor() {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState("<h1>Write some code</h1>");
  const isSavable = value.trim().length > 0;
  return (
    <div className="pt-10">
      <button
        className="border border-gray-300 px-5 py-1"
        onClick={() => setShow(!show)}
      >
        {show ? 'Hide code editor' : 'Write some code'}
      </button>
      <button
        className="ml-5 border border-gray-300 px-5 py-1"
        onClick={() => setShow(!show)}
        disabled={isSavable}
      >
        Save code
      </button>
      {show ? (
        <CodeMirror
          value={value}
          className="border border-gray-500 mt-5"
          height="600px"
          extensions={[javascript({ jsx: true })]}
          onChange={(str: string) => setValue(str)}
          theme="dark"
        />
      ) : null}
    </div>
  );
}

export default CodeEditor;