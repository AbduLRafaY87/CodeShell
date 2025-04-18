import React, { useState, useEffect } from 'react';
import CodeEditor from '../CodeEditor';
import DownloadAll from '../DownloadAll';

const CssEditor = () => {
    const [css, setCss] = useState(() => localStorage.getItem('css') || '');
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    useEffect(() => {
        localStorage.setItem('css', css);
        setShowSavedMessage(true);
        const timeout = setTimeout(() => setShowSavedMessage(false), 1500);
        return () => clearTimeout(timeout);
    }, [css]);

    const handleChange = (newValue) => setCss(newValue);

    const handleDownload = () => {
        const blob = new Blob([css], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'style.css';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="editor css">
            <div className="head">
                <p><i id='cssIcon' className="fa-brands fa-css3-alt" /> style.css</p>
                <div className="buttons">
                    <button onClick={() => setCss(document.querySelector('#css')?.value || '')}>Save</button>
                    <button onClick={() => setCss('')}>Clear</button>
                    <DownloadAll />
                </div>

            </div>
            {showSavedMessage && (
                <div className="saved-message">
                    Saving...
                </div>
            )}
            <CodeEditor id="css" language="css" value={css} onChange={handleChange} />
        </div>
    );
};

export default CssEditor;
