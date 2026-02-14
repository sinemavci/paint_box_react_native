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
  export: (
    viewRef: React.ElementRef<PaintBoxHostComponent>,
    path: string,
    mimeType: string,
    fileName: string
  ) => void;
  // isEnable: (
  //   viewRef: React.ElementRef<PaintBoxHostComponent>
  // ) => Promise<boolean>;
  setEnable: (
    viewRef: React.ElementRef<PaintBoxHostComponent>,
    enable: boolean
  ) => void;
  setPaintMode: (
    viewRef: React.ElementRef<PaintBoxHostComponent>,
    paintMode: string
  ) => void;
  // getPaintMode: (viewRef: React.ElementRef<PaintBoxHostComponent>) => string;
  setStrokeColor: (
    viewRef: React.ElementRef<PaintBoxHostComponent>,
    color: string
  ) => void;
  // getStrokeColor: (viewRef: React.ElementRef<PaintBoxHostComponent>) => string;
  setStrokeSize: (
    viewRef: React.ElementRef<PaintBoxHostComponent>,
    size: Double
  ) => void;
  // getStrokeSize: (viewRef: React.ElementRef<PaintBoxHostComponent>) => string;
}

export const Commands = codegenNativeCommands<NativeCommands>({
  supportedCommands: [
    'undo',
    'redo',
    'reset',
    'importImage',
    'export',
    // 'isEnable',
    'setEnable',
    'setPaintMode',
    // 'getPaintMode',
    'setStrokeColor',
    // 'getStrokeColor',
    'setStrokeSize',
    // 'getStrokeSize',
  ],
});

export default codegenNativeComponent<NativeProps>('PaintBoxView');
