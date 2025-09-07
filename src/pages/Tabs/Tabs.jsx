import React, { createContext, useContext, useMemo, useState } from 'react';
import './Tabs.css';

const TabsContext = createContext(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('use useTabs in context only');

  return context;
};

const Tabs = ({ children, value, defaultValue }) => {
  const [currentTab, setCurrentTab] = useState(value || defaultValue);

  const contextValue = useMemo(
    () => ({
      currentTab,
      onChange: (v) => setCurrentTab(v),
    }),
    [currentTab]
  );

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};

const TabsList = ({ children }) => {
  return <div className="tabs-list">{children}</div>;
};

const Tab = ({ value, label }) => {
  const { currentTab, onChange } = useTabs();

  return (
    <div
      className={`tab ${currentTab === value ? 'active' : ''}`}
      onClick={() => onChange(value)}
    >
      {label}
    </div>
  );
};

const TabContent = ({ children, value }) => {
  const { currentTab } = useTabs();
  if (value === currentTab) return <div>{children}</div>;

  return null;
};

Tabs.TabsList = TabsList;
Tabs.TabContent = TabContent;
Tabs.Tab = Tab;

export default Tabs;
