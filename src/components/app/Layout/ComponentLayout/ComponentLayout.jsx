import React, { useState } from 'react';
import styles from './ComponentLayout.module.css';
import CodeSnippet from '@/components/app/CodeSnippet/CodeSnippet';
import { Tabs } from '@/components/Tabs/v2';
import CopyButton from '../../CopyButton';

const ComponentLayout = ({ config, children }) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const currentFile = config.files[currentFileIndex];

  return (
    <div>
      <h1 className={styles.title}>{config.title}</h1>
      <div className={styles.content}>
        <div className={styles.preview}>{children}</div>

        {currentFile ? (
          <>
            <div className={styles['code-nav']}>
              <Tabs
                value={currentFileIndex}
                onChange={(index) => setCurrentFileIndex(index)}
              >
                <Tabs.TabsList>
                  {config.files.map((file, index) => (
                    <Tabs.Tab value={index}>{file.name}</Tabs.Tab>
                  ))}
                </Tabs.TabsList>
              </Tabs>
              <CopyButton value={currentFile.code} />
            </div>
            <div className={styles['component-code']}>
              <CodeSnippet
                gistId={currentFile.gistId}
                file={currentFile.name}
                code={currentFile.code}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ComponentLayout;
