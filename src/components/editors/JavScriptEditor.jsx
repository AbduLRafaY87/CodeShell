import React, { useState, useEffect } from 'react';
import CodeEditor from '../CodeEditor';

const JsEditor = () => {
    const defaultJS = "let heading = document.getElementById('heading') \nheading.addEventListener('click', () => { \n heading.style.color = 'red' \n })";
    const [js, setJs] = useState(() => localStorage.getItem('js') || defaultJS);
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    useEffect(() => {
        localStorage.setItem('js', js);
        setShowSavedMessage(true);
        const timeout = setTimeout(() => setShowSavedMessage(false), 1500);
        // showSavedMessage.innerHTML = "Saved!";
        // Clear the timeout if the component unmounts or html changes
        return () => clearTimeout(timeout);
    }, [js]);

    // useEffect(() => {
    //     localStorage.setItem('js', js);
    // }, [js]);

    const handleChange = (newValue) => {
        setJs(newValue);
    };

    const handleDownload = () => {
        const code = js; // correct state
        const blob = new Blob([code], { type: "text/js" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "script.js"; // file name
        document.body.appendChild(a); // ensure click works in Firefox
        a.click();
        document.body.removeChild(a); // cleanup

        URL.revokeObjectURL(url);
    };


    return (
        <div className="editor js">
            <div className="head">
                <p><i id='jsIcon' className="fa-brands fa-js"></i> script.js</p>
                <div className="buttons">
                    <button className="save" onClick={() => setJs(document.querySelector('#js').value)}>Save</button>
                    <button className="clear" onClick={() => setJs('')}>Clear</button>
                    {/* <button className="load" onClick={() => setJs(localStorage.getItem('js'))}>Load</button> */}
                    <button onClick={handleDownload} className="download-button">
                        Download Code
                    </button>
                </div>
            {showSavedMessage && (
                <div className="saved-message">Saving...</div>
            )}
            </div>
            {/* <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                style={{ width: '100%', height: '100vh' }}
            /> */}
            <CodeEditor
                value={js}
                language="javascript"
                onChange={handleChange}
            />
        </div>

    );
};

export default JsEditor;
