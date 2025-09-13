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
      gistId: '71922d881cb24f2bac3cb17ee5e521a6',
      code: codeJs,
    },
    {
      type: 'css',
      name: 'Tabs.css',
      code: codeCss,
      gistId: '97e52b97cf80fc7c642c193d68a8eb74',
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
