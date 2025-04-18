import React, { useState, useEffect } from 'react';
import CodeEditor from '../CodeEditor';
import DownloadAll from '../DownloadAll';

const HtmlEditor = () => {
    const defaultHTML = "<h1 id='heading'>Hi, Welcome to <b>CodeShell</b></h1>\n<p>An Online Code Editor by <b>Abdul Rafay Chatriwala</b></p>";
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    const [html, setHtml] = useState(() => {
        const stored = localStorage.getItem('html');
        if (stored !== null) return stored;
        localStorage.setItem('html', defaultHTML);
        return defaultHTML;
    });

    useEffect(() => {
        localStorage.setItem('html', html);
        setShowSavedMessage(true);
        const timeout = setTimeout(() => setShowSavedMessage(false), 1500);
        return () => clearTimeout(timeout);
    }, [html]);

    const handleChange = (newValue) => setHtml(newValue);

    const handleDownload = () => {
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "index.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="editor html">
            <div className="head">
                <p><i id='htmlIcon' className="fa-brands fa-html5" /> index.html</p>
                <div className="buttons">
                    <button onClick={() => setHtml(document.querySelector('#html')?.value || '')}>Save</button>
                    <button onClick={() => setHtml('')}>Clear</button>
                    <DownloadAll />
                </div>
            </div>
            {showSavedMessage && (
                <div className="saved-message">
                    Saving...
                </div>
            )}
            <CodeEditor language="html" value={html} onChange={handleChange} />
        </div>
    );
};

export default HtmlEditor;
