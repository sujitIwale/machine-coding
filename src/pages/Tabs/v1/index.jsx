import ComponentLayout from '@/components/app/Layout/ComponentLayout';
import codeJs from '@/components/Tabs/v1/Tabs.jsx?raw';
import codeCss from '@/components/Tabs/v1/Tabs.css?raw';
import { Tabs } from '@/components/Tabs/v1';

const config = {
  title: 'Tabs',
  files: [
    {
      type: 'js',
      name: 'Tabs.jsx',
      code: codeJs,
    },
    {
      type: 'css',
      name: 'Tabs.css',
      code: codeCss,
    },
  ],
};

const TabsPageV1 = () => {
  return (
    <ComponentLayout config={config}>
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
    </ComponentLayout>
  );
};

export default TabsPageV1;
