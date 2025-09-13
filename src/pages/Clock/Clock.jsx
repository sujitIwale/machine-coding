import ComponentLayout from '@/components/app/Layout/ComponentLayout';
import AnalogClock from '@/components/AnalogClock/AnalogClock';
import codeJs from '@/components/AnalogClock/AnalogClock.jsx?raw';
import codeCss from '@/components/AnalogClock/AnalogClock.css?raw';

const config = {
  title: 'Analog Clock',
  files: [
    {
      type: 'js',
      name: 'AnalogClock.jsx',
      code: codeJs,
    },
    {
      type: 'css',
      name: 'AnalogClock.css',
      code: codeCss,
    },
  ],
};

const AnalogClockPage = () => {
  return (
    <ComponentLayout config={config}>
      <AnalogClock />
    </ComponentLayout>
  );
};

export default AnalogClockPage;
