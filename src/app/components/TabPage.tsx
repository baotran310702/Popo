import TabLeft from './TabLeft';
import TabRight from './TabRight';

interface TabPageProps {
  position: 'left' | 'right';
}

export default function TabPage({ position }: TabPageProps) {
  return (
    <>
      {position === 'left' ? <TabLeft /> : <TabRight />}
    </>
  );
} 