import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import './Tabs.css';

const TabsContext = createContext(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('useTabs must be used within <Tabs>');

  return context;
};

const Tabs = ({ children, value, onChange, defaultValue }) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentTab = isControlled ? value : internalValue;

  const handleTabChange = useCallback(
    (tabValue) => {
      if (!isControlled) setInternalValue(tabValue);
      if (onChange) {
        onChange(tabValue);
      }
    },
    [isControlled, onChange]
  );

  const contextValue = useMemo(
    () => ({
      currentTab,
      onChange: handleTabChange,
    }),
    [currentTab, handleTabChange]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children }) => {
  return <div className="tabs-list">{children}</div>;
};

const Tab = ({ value, children, disabled }) => {
  const { currentTab, onChange } = useTabs();

  return (
    <button
      className={`tab ${currentTab === value ? 'active' : ''}`}
      onClick={() => onChange(value)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const TabPanel = ({ children, value }) => {
  const { currentTab } = useTabs();
  if (value === currentTab) return <div>{children}</div>;

  return null;
};

Tabs.TabsList = TabsList;
Tabs.TabPanel = TabPanel;
Tabs.Tab = Tab;

export default Tabs;
