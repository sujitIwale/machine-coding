import Tabs from './Tabs';

const TabsPage = () => {
  return (
    <div>
      <Tabs value={'js'}>
        <Tabs.TabsList>
          <Tabs.Tab value={'js'} label={'Javascript'} />
          <Tabs.Tab value={'css'} label={'Css'} />
          <Tabs.Tab value={'ts'} label={'Typescript'} />
        </Tabs.TabsList>

        <Tabs.TabContent value={'js'}>This is JS</Tabs.TabContent>
        <Tabs.TabContent value={'css'}>This is CSS</Tabs.TabContent>
        <Tabs.TabContent value={'ts'}>This is TS</Tabs.TabContent>
      </Tabs>
    </div>
  );
};

export default TabsPage;
