import React, { useState, useEffect } from 'react';
import CodeEditor from '../CodeEditor';

const CssEditor = () => {
    const defaultCSS = "h1 { color: blue; }";
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const [css, setCss] = useState(localStorage.getItem('css') || defaultCSS);

    useEffect(() => {
        localStorage.setItem('css', css);
        setShowSavedMessage(true);
        const timeout = setTimeout(() => setShowSavedMessage(false), 1500);
        // showSavedMessage.innerHTML = "Saved!";
        // Clear the timeout if the component unmounts or html changes
        return () => clearTimeout(timeout);
    }, [css]);

    // useEffect(() => {
    //     localStorage.setItem('css', css);
    // }, [css]);

    const handleChange = (newValue) => {
        setCss(newValue);
    };

    const handleDownload = () => {
        const code = css; // correct state
        const blob = new Blob([code], { type: "text/css" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "style.css"; // file name
        document.body.appendChild(a); // ensure click works in Firefox
        a.click();
        document.body.removeChild(a); // cleanup

        URL.revokeObjectURL(url);
    };


    return (
        <div className="editor css">
            <div className="head">
                <p><i id='cssIcon' className="fa-brands fa-css3"></i> style.css</p>
                <div className="buttons">
                    <button className="save" onClick={() => setCss(document.querySelector('#css').value)}>Save</button>
                    <button className="clear" onClick={() => setCss('')}>Clear</button>
                    {/* <button className="load" onClick={() => setCss(localStorage.getItem('css'))}>Load</button> */}
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

            {/* <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                style={{ width: '100%', height: '100vh' }}
            /> */}
            <CodeEditor
                language="css"
                value={css}
                onChange={handleChange}
            />
        </div>

    );
};

export default CssEditor;
