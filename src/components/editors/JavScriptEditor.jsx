import React, { useState, useEffect } from 'react';
import CodeEditor from '../CodeEditor';

const JsEditor = () => {
    const [js, setJs] = useState(() => localStorage.getItem('js') || '');

    useEffect(() => {
        localStorage.setItem('js', js);
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
                <p><i className="fa-brands fa-js" /> script.js</p>
                <div className="buttons">
                    <button onClick={() => setJs(document.querySelector('#js')?.value || '')}>Save</button>
                    <button onClick={() => setJs('')}>Clear</button>
                    <button onClick={handleDownload}>Download</button>
                </div>
            </div>
            <CodeEditor id="js" language="javascript" value={js} onChange={handleChange} />
        </div>
    );
};

export default JsEditor;
