import React, { useState, useEffect } from 'react';
import CodeEditor from '../CodeEditor';

const HtmlEditor = () => {
    const defaultHTML = "<h1 id='heading'>Hello World</h1>\n<p>Click heading to see magic<p>";
    const [html, setHtml] = useState(() => localStorage.getItem('html') || defaultHTML);
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    useEffect(() => {
        localStorage.setItem('html', html);
        setShowSavedMessage(true);
        const timeout = setTimeout(() => setShowSavedMessage(false), 1500);
        // showSavedMessage.innerHTML = "Saved!";
        // Clear the timeout if the component unmounts or html changes
        return () => clearTimeout(timeout);
    }, [html]);

    const handleChange = (newValue) => {
        setHtml(newValue);
    };

    const handleDownload = () => {
        const code = html; // correct state
        const blob = new Blob([code], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "index.html"; // file name
        document.body.appendChild(a); // ensure click works in Firefox
        a.click();
        document.body.removeChild(a); // cleanup

        URL.revokeObjectURL(url);
    };



    return (
        <div className="editor html">
            <div className="head">
                <p><i id='htmlIcon' className="fa-brands fa-html5"></i> index.html</p>
                <div className="buttons">
                    <button className="save" onClick={() => setHtml(document.querySelector('#html').value)}>Save</button>
                    <button className="clear" onClick={() => setHtml('')}>Clear</button>
                    {/* <button className="load" onClick={() => setHtml(localStorage.getItem('html'))}>Load</button> */}
                    <button onClick={handleDownload} className="download-button">
                        Download Code
                    </button>

                </div>
            </div>

            {showSavedMessage && (
                <div className="saved-message">
                    Saving...
                </div>
            )}

            <CodeEditor
                language="html"
                value={html}
                onChange={handleChange}
            />
        </div>
    );
};

export default HtmlEditor;
