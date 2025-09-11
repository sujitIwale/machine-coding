import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
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
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabs = useRef({});

  const isControlled = value !== undefined;
  const currentTab = isControlled ? value : internalValue;

  const registerTab = useCallback((tabValue, element) => {
    tabs.current[tabValue] = element;
  }, []);

  const updateIndicator = (tabValue) => {
    const tabElement = tabs.current[tabValue];

    if (tabElement) {
      setIndicatorStyle({
        height: tabElement.offsetHeight,
        width: tabElement.offsetWidth,
        transform: `translateX(${tabElement.offsetLeft}px)`,
        top: tabElement.offsetTop,
      });
    }
  };

  const handleTabChange = useCallback(
    (tabValue) => {
      if (!isControlled) setInternalValue(tabValue);
      if (onChange) {
        onChange(tabValue);
      }
    },
    [isControlled, onChange]
  );

  useLayoutEffect(() => {
    updateIndicator(currentTab);
  }, [currentTab]);

  const contextValue = useMemo(
    () => ({
      currentTab,
      onChange: handleTabChange,
      registerTab,
    }),
    [currentTab, handleTabChange, registerTab]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className="tabs">
        {children}
        <Indicator style={indicatorStyle} />
      </div>
    </TabsContext.Provider>
  );
};

const Indicator = ({ style }) => {
  return <span className="tabs-indicator" style={style} />;
};

const TabsList = ({ children }) => {
  return <div className="tabs-list">{children}</div>;
};

const Tab = ({ value, children, disabled }) => {
  const { currentTab, onChange, registerTab } = useTabs();

  const callbackRef = useCallback(
    (element) => {
      registerTab(value, element);
    },
    [value, registerTab]
  );

  return (
    <button
      className={`tab ${currentTab === value ? 'active' : ''}`}
      onClick={() => onChange(value)}
      ref={callbackRef}
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
