import PaintBoxView from './PaintBoxViewNativeComponent';
import type { ViewProps } from 'react-native';
//import type { IPaintEditor } from './IPaintEditor';

export type PaintBoxViewProps = {
  //paintEditor: IPaintEditor;
  id?: string;
  style?: ViewProps;
  children?: React.ReactNode;
  childrenPosition?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
};

export const PaintBoxRNView: React.FC<
  PaintBoxViewProps
> = ({}: PaintBoxViewProps) => {
  // eslint-disable-next-line react-native/no-inline-styles
  return <PaintBoxView style={{ flex: 1 }} />;
};
