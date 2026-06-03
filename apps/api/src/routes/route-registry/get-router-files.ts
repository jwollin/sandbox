export const ACCEPTED_ROUTER_FILES = [
  'route.ts',
  'route.js',
  'meta.json'
];

export const getRouterFiles = (directoryFiles: string[]) => {
  return ACCEPTED_ROUTER_FILES.reduce((acc: Record<string, string>, file, _index) => {
    const directoryFile: string | null = directoryFiles.find(dirFile => {
      return dirFile === file;
    }) ?? null;

    if (!directoryFile) {
      return acc;
    }

    const filenameWithoutExtension = directoryFile.split('.');
    const [filename] = filenameWithoutExtension;
    acc[filename] = file;
    return acc;
  }, {});
}