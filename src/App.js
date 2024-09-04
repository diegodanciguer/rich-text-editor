import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa os estilos do Quill

function App() {
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  return (
    <div className="App">
      <h1>Rich Text Editor</h1>
      <ReactQuill 
        value={editorContent}
        onChange={handleEditorChange}
        theme="snow"
      />
      <div className="output">
        <h3>Editor Output</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
}

export default App;
