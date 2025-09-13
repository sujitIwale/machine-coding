import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ code }) => {
  // useEffect(() => {
  //   if (hidden) return;

  //   const fetchGist = async () => {
  //     try {
  //       const res = await fetch(`https://api.github.com/gists/${gistId}`);
  //       const data = await res.json();
  //       if (file && data.files[file]) {
  //         setCode(data.files[file].content);
  //       } else {
  //         // fallback: just take first file
  //         const firstFile = Object.values(data.files)[0];
  //         setCode(firstFile.content);
  //       }
  //     } catch (err) {
  //       console.error('Error fetching gist:', err);
  //     }
  //   };

  //   fetchGist();
  // }, [gistId, file, hidden]);

  return (
    <SyntaxHighlighter
      language="javascript"
      style={{ ...oneLight, marginTop: 0 }}
      showLineNumbers
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
