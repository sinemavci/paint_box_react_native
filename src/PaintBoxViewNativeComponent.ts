import {
  type ViewProps,
  codegenNativeCommands,
  type HostComponent,
} from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface NativeProps extends ViewProps {}

export type PaintBoxHostComponent = HostComponent<NativeProps>;

export type PaintBoxRef = React.ElementRef<PaintBoxHostComponent>;

interface NativeCommands {
  undo: (viewRef: React.ElementRef<PaintBoxHostComponent>) => void;
  redo: (viewRef: React.ElementRef<PaintBoxHostComponent>) => void;
}

export const Commands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['undo', 'redo'],
});

export default codegenNativeComponent<NativeProps>('PaintBoxView');
