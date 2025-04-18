import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';
import './App.jsx';
import Headers from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Preview from './components/Preview.jsx';
import HtmlEditor from './components/editors/HtmlEditor.jsx';
import CssEditor from './components/editors/CssEditor.jsx';
import JsEditor from './components/editors/JavScriptEditor.jsx';
// import HowToUse from './components/pages/HowToUse.jsx'; // Adjust path if needed

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <BrowserRouter>
    <Routes>
      {/* Route for "How to Use" page with only Header and HowToUse */}
      <Route
        path="/preview"
        element={
          <>
            <div className='container'><Preview width="100vw" /></div>
            {/* <HowToUse /> */}
          </>
        }
      />

      {/* Main editor routes with full layout */}
      <Route
        path="*"
        element={
          <div className="container">
            <Headers />
            <div className="app-layout">
              <Sidebar />
              <div className="editor-and-preview">
                <Routes>
                  <Route path="/html" element={<HtmlEditor />} />
                  <Route path="/css" element={<CssEditor />} />
                  <Route path="/js" element={<JsEditor />} />
                  <Route path="*" element={<Navigate to="/html" replace />} />
                </Routes>
              </div>
              <Preview />
            </div>
          </div>
        }
      />
    </Routes>
  </BrowserRouter>
);
