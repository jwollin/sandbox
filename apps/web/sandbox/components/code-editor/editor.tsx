'use client';

import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import { javascript } from '@codemirror/lang-javascript';

export type Register = {
  id: string;
  public: boolean;
  name: string;
  localUrl: string;
  healthPath: string;
  description: string;
};

const jsonLinter = linter((view) => {
  try {
    JSON.parse(view.state.doc.toString());

    return [];
  } catch (error) {
    return [
      {
        from: 0,
        to: view.state.doc.length,
        severity: 'error',
        message: error instanceof Error ? error.message : 'Invalid JSON',
      },
    ];
  }
});

export enum EDITOR {
  JAVASCRIPT = 'JAVASCRIPT',
  JSON = 'JSON',
  CSS = 'CSS',
}

export function getEditorType({ type }: { type: string }) {
  switch (type) {
    case EDITOR.JAVASCRIPT: {
      return [javascript()];
    }
    case EDITOR.JSON: {
      return [json(), jsonLinter];
    }
    default:
      return [];
  }
}

export function CodeEditor({
  code,
  className,
  type = 'JSON',
}: {
  type?: string;
  className?: string;
  code: string;
}) {
  const [show, setShow] = useState<boolean>(true);
  const [value, setValue] = useState<string>(code);
  const editorType = getEditorType({ type });
  return (
    <div className={className ?? ''}>
      {show ? (
        <CodeMirror
          value={value}
          className="border border-gray-500 mt-2"
          height="600px"
          extensions={editorType}
          onChange={(str: string) => setValue(str)}
          theme="dark"
        />
      ) : null}
    </div>
  );
}

export default CodeEditor;
