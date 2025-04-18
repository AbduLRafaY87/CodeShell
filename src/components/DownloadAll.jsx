import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const DownloadAll = () => {
    const handleDownloadZip = () => {
        const zip = new JSZip();

        const html = localStorage.getItem('html') || '';
        const css = localStorage.getItem('css') || '';
        const js = localStorage.getItem('js') || '';

        zip.file("index.html", html);
        zip.file("style.css", css);
        zip.file("script.js", js);

        zip.generateAsync({ type: "blob" })
            .then((content) => {
                saveAs(content, "codeShellProject.zip");
            });
    };

    return (
        <button onClick={handleDownloadZip} className="download-zip-button">
            Download ZIP
        </button>
    );
};

export default DownloadAll;
