'use client';

import React from 'react';
import { Data, Route } from '@/app/page';
import CodeMirror from '@uiw/react-codemirror';
import { json as jsonPlugin } from '@codemirror/lang-json';

export function RouteTable({ data }: { data: Data }) {
  const routes: Route[] = data?.routes ?? [];
  return (
    <>
      <h2 className="text-2xl font-bold">Routes</h2>
      <p className="flex gap-5">
        <span>
          <span className="font-bold">Status:</span> {data.status}
        </span>
        <span>
          <span className="font-bold">Version:</span> {data.version}
        </span>
      </p>
      {routes.length > 0 ? (
        <div className="w-full mt-5 mx-auto border border-gray-500 rounded overflow-hidden shadow-sm">
          {routes.map((route: Route): React.ReactNode => {
            return <RouteEditor route={route} />;
          })}
        </div>
      ) : null}
    </>
  );
}

export function RouteEditor({ route }: { route: Route }) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [error, setError] = React.useState<string>('');
  const [params, setParams] = React.useState<string>('');
  const [url, setUrl] = React.useState<string>(route.url);
  const [editing, setEditing] = React.useState<boolean>(false);
  const [showEditor, setShowEditing] = React.useState<boolean>(true);
  const [show, setShow] = React.useState<boolean>(true);
  const [json, setJSON] = React.useState<string>('{}');

  React.useEffect(() => {
    (async () => {
      if (!url) {
        return setError('Url was not provided.');
      }

      try {
        const response = await fetch(url);
        const resJson = await response.json();

        setJSON(JSON.stringify(resJson, null, 4));
        return;
      } catch (e) {
        setError('Ruh roh Raggy');
      }
    })();
  }, [url]);

  const routeInputValue = `${route.url}${params ? `?${params}` : ''}`;
  return (
    <>
      {error && <div className="text-red">{error}</div>}
      <div className="w-full flex justify-between border-b border-gray-500 bg-cyan-950 hover:bg-gray-700 text-left tracking-wider">
        <div className="px-6 py-3">
          <span className="font-semibold text-gray-300 uppercase ">Name: </span>
          {route.name}
        </div>
        <div className="px-5 py-1 font-semibold bg-green-600 text-white flex items-center">
          {route.status}
        </div>
      </div>
      {show && (
        <>
          {editing ? (
            <div className="flex">
              <code className="w-full">
                <label htmlFor="params" className="sr-only">
                  Params
                </label>
                <input
                  value={routeInputValue ?? ''}
                  ref={inputRef}
                  style={{
                    fieldSizing: 'content',
                    resize: 'none',
                  }}
                  className="w-full bg-gray-900 px-6 py-2"
                  id="params"
                  onChange={(event) => {
                    const text = event?.target?.value;
                    const cleanText = text
                      .replaceAll(`${url}?`, '')
                      .replaceAll(url, '');
                    setParams(cleanText);
                  }}
                />
              </code>
            </div>
          ) : (
            <div className="flex w-full">
              <div className="w-full bg-gray-900 px-6 py-2">
                <code>{routeInputValue ?? ''}</code>
              </div>
            </div>
          )}
          <div className="w-full flex flex-end">
            <button
              className="px-3 py-3 hover:text-white hover:bg-blue-600 cursor-pointer"
              onClick={() => setUrl(routeInputValue)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
            </button>
            <button
              className="px-3 py-3 hover:text-white hover:bg-orange-700 cursor-pointer"
              onClick={() => {
                setEditing(!editing);
                setTimeout(() => {
                  inputRef?.current?.focus();
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button
              className="px-3 py-3 hover:text-white hover:bg-blue-600 cursor-pointer"
              onClick={() => setShowEditing(!showEditor)}
            >
              {showEditor ? (
                <span className="block border border-b border-w border-1" />
              ) : (
                <span className="block h-5 border border-w border-1" />
              )}
            </button>
          </div>
          {showEditor ? (
            <div className="border-t p-3">
              <CodeMirror
                value={json}
                className="border border-gray-500 mt-2"
                height="300px"
                theme="dark"
                extensions={[jsonPlugin()]}
                readOnly
                editable={false}
                onChange={(value) => {
                  console.log('Code changed:', value);
                }}
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default RouteTable;
