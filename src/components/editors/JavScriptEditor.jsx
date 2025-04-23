import React, { useState, useEffect } from 'react';
import CodeEditor from '../CodeEditor';
import DownloadAll from '../DownloadAll';

const JsEditor = () => {
    const [js, setJs] = useState(() => localStorage.getItem('js') || '');
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    useEffect(() => {
        localStorage.setItem('js', js);
        setShowSavedMessage(true);
        const timeout = setTimeout(() => setShowSavedMessage(false), 1500);
        return () => clearTimeout(timeout);
    }, [js]);

    const handleChange = (newValue) => setJs(newValue);

    const handleDownload = () => {
        const blob = new Blob([js], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "script.js";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="editor js">
            <div className="head">
                <p><i id='jsIcon' className="fa-brands fa-js" /> script.js</p>
                <div className="buttons">
                    {/* <button onClick={() => setJs(document.querySelector('#js')?.value || '')}>Save</button> */}
                    <button onClick={() => setJs('')}>Clear</button>
                    <DownloadAll />
                </div>
            </div>
            {showSavedMessage && (
                <div className="saved-message">
                    Saving...
                </div>
            )}
            <CodeEditor id="js" language="javascript" value={js} onChange={handleChange} />
        </div>
    );
};

export default JsEditor;
