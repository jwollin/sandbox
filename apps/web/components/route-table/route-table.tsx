'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json as jsonPlugin } from '@codemirror/lang-json';

export type Data = {
  status: string;
  version: string;
  timestamp: string;
  routes: Route[];
  pageUrl: string;
};

export type Route = {
  status: string;
  meta: {
    self: string;
    parent: string;
    name: string;
  };
};

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
            return (
              <RouteEditor key={route?.meta?.name ?? 'unknown'} route={route} />
            );
          })}
        </div>
      ) : null}
    </>
  );
}

const getStatusProps = (
  status: string | number,
): { statusText: string | number; className: string } => {
  const statusCode = String(status);
  if (statusCode.startsWith('2')) {
    return {
      statusText: '200',
      className: 'bg-green-600',
    };
  } else if (statusCode.startsWith('4')) {
    return {
      statusText: '400',
      className: 'bg-red-600',
    };
  } else {
    return {
      statusText: 'Status Unknown',
      className: 'bg-gray-600',
    };
  }
};

export const RouteStatus = ({ status }: { status: string | number }) => {
  const { className, statusText } = getStatusProps(status);

  return (
    <div
      className={`${className} font-semibold text-white px-5 py-1 flex items-center`}
    >
      {statusText}
    </div>
  );
};

export function RouteEditor({ route }: { route: Route }) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [globalMessage, setGlobalMessage] = React.useState<{
    type: string;
    message: string;
  }>({
    type: '',
    message: '',
  });
  const [params, setParams] = React.useState<string>('');
  const [url, setUrl] = React.useState<string>(route.meta.self);
  const [editing, setEditing] = React.useState<boolean>(false);
  const [showEditor, setShowEditing] = React.useState<boolean>(true);
  const [json, setJSON] = React.useState<string>('{}');
  React.useEffect(() => {
    (async () => {
      if (!url) {
        return setGlobalMessage({
          type: 'ERROR',
          message: 'Url was not provided.',
        });
      }

      try {
        const response = await fetch(url);
        const resJson = await response.json();
        return setJSON(JSON.stringify(resJson, null, 4));
      } catch {
        setGlobalMessage({
          type: 'ERROR',
          message: 'Ruh roh Raggy',
        });
      }
    })();
  }, [url]);
  const routeInputValue: string = `${route.meta.self}${params ? `?${params}` : ''}`;

  return (
    <>
      {globalMessage?.message && (
        <div
          className={`text-${globalMessage.type === 'ERROR' ? 'red' : 'teal-500'}`}
        >
          {globalMessage.message}
        </div>
      )}
      <div className="w-full flex justify-between border-b border-gray-500 bg-cyan-950 hover:bg-gray-700 text-left tracking-wider">
        <div className="px-6 py-3">
          <span className="font-semibold text-gray-300 uppercase">
            Name:&nbsp;
          </span>
          {route.meta.name}
        </div>
        <RouteStatus status={route.status} />
      </div>
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
              <code>{routeInputValue}</code>
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
            className="px-3 py-3 hover:text-white hover:bg-blue-600 cursor-pointer"
            onClick={() => {
              navigator.clipboard
                .writeText(json)
                .then(() => {
                  setGlobalMessage({
                    type: 'INFO',
                    message: 'Text successfully copied!',
                  });
                })
                .catch((err) => {
                  console.error('Failed to copy text: ', err);
                });
            }}
          >
            Copy
          </button>
          <button
            className="px-3 py-3 hover:text-white hover:bg-orange-700 cursor-pointer"
            onClick={() => {
              setEditing(!editing);
              setTimeout(() => {
                inputRef?.current?.focus();
              }, 100);
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
            />
          </div>
        ) : null}
      </>
    </>
  );
}

export default RouteTable;
