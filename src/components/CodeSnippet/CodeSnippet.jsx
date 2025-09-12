import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ gistId, file }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchGist = async () => {
      try {
        const res = await fetch(`https://api.github.com/gists/${gistId}`);
        const data = await res.json();
        if (file && data.files[file]) {
          setCode(data.files[file].content);
        } else {
          // fallback: just take first file
          const firstFile = Object.values(data.files)[0];
          setCode(firstFile.content);
        }
      } catch (err) {
        console.error('Error fetching gist:', err);
      }
    };

    fetchGist();
  }, [gistId, file]);

  return (
    <SyntaxHighlighter
      language="javascript"
      style={vscDarkPlus}
      showLineNumbers
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
