import React, { useState } from 'react';
import styles from './ComponentLayout.module.css';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';

const ComponentLayout = ({ title, children }) => {
  const [codeVisible, setCodeVisible] = useState(false);

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles['component-preview']}>{children}</div>

      <div className={styles['component-code']}>
        <button onClick={() => setCodeVisible((prev) => !prev)}>
          {codeVisible ? 'Hide code' : 'Show Code'}
        </button>
        {/* {!codeVisible ? : null} */}

        <div
          className={`${styles['fake-code']} ${codeVisible ? 'hidden' : ''}`}
        />
        <CodeSnippet
          hidden={!codeVisible}
          gistId="71922d881cb24f2bac3cb17ee5e521a6"
          file={'example.jsx'}
        />
      </div>
    </div>
  );
};

export default ComponentLayout;
