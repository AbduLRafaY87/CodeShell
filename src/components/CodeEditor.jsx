import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {
  return (
    <Editor
      height="90vh"
      language={language}
      value={value}
      theme="vs-dark"
      onChange={(value) => onChange(value)}
      options={{
        fontSize: 16,
        minimap: { enabled: true },
        // lineNumbers: 'on',
        wordWrap: 'on',
        automaticLayout: true,
        wordBasedSuggestions: true,
        quickSuggestions: true,
        // wordBasedSuggestions: true,
        // quickSuggestionsDelay: 100,
        suggestOnTriggerCharacters: true,
        tabSize: 2,
        formatOnType: true,
        formatOnPaste: true,
        // autoIndent: 'full',
        // allow-modals: true,
        // autoClosingBrackets: language,
      }}
    />
  );
};

export default CodeEditor;
