import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Preview = ({ width }) => {
    const location = useLocation();
  
    const isPreviewPage = location.pathname === '/preview';
    const previewStyle = {
      width: isPreviewPage ? '100vw' : width || '45vw',
    };
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
        <div className="preview" style={previewStyle}>
            <div className="previewHead">
                {/* <i class="fa-solid fa-rotate-right"></i> */}
                {/* <p> https://www.codeshell.chatriwala.com/preview <i className="fa-solid fa-star"></i></p> */}
                <Link to="/preview" target='_blank' className="previewLink"><i className="fa-solid fa-shield"></i>https://www.codeshell.chatriwala.com/preview<i className="fa-solid fa-eye"></i></Link>

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
