import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './App.css';

function App() {
  const [editorContent, setEditorContent] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [theme, setTheme] = useState('light'); // Estado para controlar o tema

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setEditorContent(savedContent);
    }
  }, []);

  useEffect(() => {
    if (editorContent !== '') {
      localStorage.setItem('editorContent', editorContent);
    }
  }, [editorContent]);

  const saveToFile = () => {
    const element = document.createElement('a');
    const file = new Blob([editorContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'editorContent.html';
    document.body.appendChild(element);
    element.click();
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className={`App ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <h1>📝 Rich Text Editor</h1>

      {/* Select estilizado para alternar entre os temas */}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="select-theme"
      >
        <option value="light">🌞 Tema Claro</option>
        <option value="dark">🌙 Tema Escuro</option>
      </select>

      {isEditing ? (
        <>
          <ReactQuill
            value={editorContent}
            onChange={(content) => setEditorContent(content)}
            theme="snow"
            modules={modules}
          />
          <button
            onClick={() => setIsEditing(false)}
            className="toggle-button"
          >
            👀 Visualizar
          </button>
        </>
      ) : (
        <>
          <div className="output">
            <h3>Visualização do Conteúdo (HTML)</h3>
            <div dangerouslySetInnerHTML={{ __html: editorContent }} />
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="toggle-button"
          >
            ✏️ Voltar ao Editor
          </button>
          <button
            onClick={saveToFile}
            className="save-button"
          >
            💾 Salvar Conteúdo
          </button>
        </>
      )}
    </div>
  );
}

export default App;
