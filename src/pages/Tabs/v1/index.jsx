import { Tabs } from '@/components/Tabs/v1';

const TabsPageV1 = () => {
  return (
    <div>
      <Tabs defaultValue={'js'}>
        <Tabs.TabsList>
          <Tabs.Tab value={'js'}>Javascript</Tabs.Tab>
          <Tabs.Tab value={'css'} disabled>
            Css
          </Tabs.Tab>
          <Tabs.Tab value={'ts'}>Typescript</Tabs.Tab>
        </Tabs.TabsList>

        <Tabs.TabPanel value={'js'}>This is JS</Tabs.TabPanel>
        <Tabs.TabPanel value={'css'}>This is CSS</Tabs.TabPanel>
        <Tabs.TabPanel value={'ts'}>This is TS</Tabs.TabPanel>
      </Tabs>
    </div>
  );
};

export default TabsPageV1;
