import {
  type ViewProps,
  codegenNativeCommands,
  type HostComponent,
} from 'react-native';
import { codegenNativeComponent } from 'react-native';
// @ts-ignore
import type { Double } from 'react-native/Libraries/Types/CodegenTypes';

export interface NativeProps extends ViewProps {}

export type PaintBoxHostComponent = HostComponent<NativeProps>;

export type PaintBoxRef = React.ElementRef<PaintBoxHostComponent>;

interface NativeCommands {
  undo: (viewRef: React.ElementRef<PaintBoxHostComponent>) => void;
  redo: (viewRef: React.ElementRef<PaintBoxHostComponent>) => void;
  reset: (viewRef: React.ElementRef<PaintBoxHostComponent>) => void;
  importImage: (
    viewRef: React.ElementRef<PaintBoxHostComponent>,
    path: string,
    width: Double,
    height: Double
  ) => void;
  setEnable: (
    viewRef: React.ElementRef<PaintBoxHostComponent>,
    enable: boolean
  ) => void;
  setPaintMode: (
    viewRef: React.ElementRef<PaintBoxHostComponent>,
    paintMode: string
  ) => void;
  setStrokeColor: (
    viewRef: React.ElementRef<PaintBoxHostComponent>,
    color: string
  ) => void;
  setStrokeSize: (
    viewRef: React.ElementRef<PaintBoxHostComponent>,
    size: Double
  ) => void;
}

export const Commands = codegenNativeCommands<NativeCommands>({
  supportedCommands: [
    'undo',
    'redo',
    'reset',
    'importImage',
    'setEnable',
    'setPaintMode',
    'setStrokeColor',
    'setStrokeSize',
  ],
});

export default codegenNativeComponent<NativeProps>('PaintBoxView');
