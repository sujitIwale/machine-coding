import { Tabs } from '@/components/Tabs/v1';

const TabsPageV1 = () => {
  return (
    <div>
      <Tabs defaultValue={'js'}>
        <Tabs.TabsList>
          <Tabs.Tab value={'js'}>Javascript</Tabs.Tab>
          <Tabs.Tab value={'css'}>Css</Tabs.Tab>
          <Tabs.Tab value={'ts'}>Typescript</Tabs.Tab>
        </Tabs.TabsList>

        <Tabs.TabContent value={'js'}>This is JS</Tabs.TabContent>
        <Tabs.TabContent value={'css'}>This is CSS</Tabs.TabContent>
        <Tabs.TabContent value={'ts'}>This is TS</Tabs.TabContent>
      </Tabs>
    </div>
  );
};

export default TabsPageV1;
