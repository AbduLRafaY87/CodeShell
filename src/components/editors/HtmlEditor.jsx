import React, { useState, useEffect } from 'react';
import CodeEditor from '../CodeEditor';
import DownloadAll from '../DownloadAll';

const HtmlEditor = () => {
    const defaultHTML = "<h1 id='heading'>Hello World</h1>\n<p>Click heading to see magic</p>";

    const [html, setHtml] = useState(() => {
        const stored = localStorage.getItem('html');
        if (stored !== null) return stored;
        localStorage.setItem('html', defaultHTML);
        return defaultHTML;
    });

    useEffect(() => {
        localStorage.setItem('html', html);
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
                <p><i className="fa-brands fa-html5" /> index.html</p>
                <div className="buttons">
                    <button onClick={() => setHtml(document.querySelector('#html')?.value || '')}>Save</button>
                    <button onClick={() => setHtml('')}>Clear</button>
                    <DownloadAll />
                </div>
            </div>
            <CodeEditor language="html" value={html} onChange={handleChange} />
        </div>
    );
};

export default HtmlEditor;
