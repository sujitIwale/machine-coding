import { Outlet } from 'react-router-dom';
import './Layout.css';
import SideBar from './Sidebar/Sidebar';
import { Suspense, useState } from 'react';
import { Tabs } from '../../Tabs/v2';
import CodeSnippet from '../CodeSnippet/CodeSnippet';

const Layout = () => {
  const [sidebarWidth, setSidebarWidth] = useState(20);

  return (
    <div className="layout">
      {/* <header>
        <button onClick={() => navigate('/')}>Back</button>
      </header> */}
      <SideBar width={sidebarWidth} />
      <main className="main-container">
        <Suspense fallback={<div className="loading">Loading content...</div>}>
          <Outlet />
          {/* <Tabs defaultValue={'preview'}>
            <Tabs.TabsList>
              <Tabs.Tab value={'preview'}>Preview</Tabs.Tab>
              <Tabs.Tab value={'code'}>Code</Tabs.Tab>
            </Tabs.TabsList>
            <Tabs.TabPanel value={'preview'}>
              <Outlet />
            </Tabs.TabPanel>
            <Tabs.TabPanel value={'code'}>
              <CodeSnippet
                gistId="71922d881cb24f2bac3cb17ee5e521a6"
                file={'example.jsx'}
              />
            </Tabs.TabPanel>
          </Tabs> */}
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
