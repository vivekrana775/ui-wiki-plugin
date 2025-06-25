declare module '*.svg' {
  const content: any;
  export default content;
}

interface Clipboard {
  writeText: (text: string) => Promise<void>;
}

interface PluginAPI {
  clipboard: Clipboard;
}