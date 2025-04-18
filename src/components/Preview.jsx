import React, { useState, useEffect } from 'react';

const Preview = () => {
    const [srcDoc, setSrcDoc] = useState("");

    useEffect(() => {
        const updatePreview = () => {
            const html = localStorage.getItem('html') || "";
            const css = localStorage.getItem('css') || "";
            const js = localStorage.getItem('js') || "";
            // console.log("Html:" + html);
            // console.log("Css:" + css);
            // console.log("Js:" + js);
            const finalCode = `
        <html>
          <head><style>${css}</style></head>
          <body>
            ${html}
            <script>${js}<\/script>
          </body>
        </html>
        
      `;

            setSrcDoc(finalCode);
        };

        updatePreview(); // Initial render
        const interval = setInterval(updatePreview, 1000); // Check every second

        return () => clearInterval(interval); // Clean up
    }, []);

    return (
        <div className="preview">
            <div className="previewHead">
                {/* <i class="fa-solid fa-rotate-right"></i> */}
                <p><i className="fa-solid fa-shield"></i> https://www.codeshell.chatriwala.com/preview <i className="fa-solid fa-star"></i></p>

            </div>
            <iframe
                srcDoc={srcDoc}
                title="Live Preview"
                sandbox="allow-scripts"
                style={{ width: '100%', height: '100vh', border: 'none' }}
            />


        </div>
    );
};

export default Preview;
