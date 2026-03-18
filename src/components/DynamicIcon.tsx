import * as AntIcons from 'react-icons/ai';
import * as BootstrapIcons from 'react-icons/bs';
import * as CssGG from 'react-icons/cg';
import * as DevIcons from 'react-icons/di';
import * as FontAwesome from 'react-icons/fa';
import * as GameIcons from 'react-icons/gi';
import * as Io5 from 'react-icons/io5';
import * as MaterialDesignIcons from 'react-icons/md';
import * as SimpleIcons from 'react-icons/si';
import * as TablerIcons from 'react-icons/tb';

const libraries: Record<string, Record<string, React.ComponentType>> = {
  ai: AntIcons as Record<string, React.ComponentType>,
  bs: BootstrapIcons as Record<string, React.ComponentType>,
  cg: CssGG as Record<string, React.ComponentType>,
  di: DevIcons as Record<string, React.ComponentType>,
  fa: FontAwesome as Record<string, React.ComponentType>,
  gi: GameIcons as Record<string, React.ComponentType>,
  io: Io5 as Record<string, React.ComponentType>,
  md: MaterialDesignIcons as Record<string, React.ComponentType>,
  si: SimpleIcons as Record<string, React.ComponentType>,
  tb: TablerIcons as Record<string, React.ComponentType>,
};

const getLibrary = (name = 'io') => libraries[name.substring(0, 2).toLowerCase()];

const DynamicIcon = ({ name = 'io' }: { name?: string }) => {
  const library = getLibrary(name);
  const IconComponent = library?.[name];

  return IconComponent ? <IconComponent /> : <Io5.IoHomeOutline />;
};

export default DynamicIcon;
