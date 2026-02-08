import { codegenNativeCommands, type HostComponent } from 'react-native';

export type NativeProps = {
  ref: any;
};

interface NativeCommands {
  undo: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  redo: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
}

export const Commands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['undo', 'redo'],
});
