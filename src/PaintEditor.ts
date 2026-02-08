import type { IPaintEditor } from './IPaintEditor';

export class PaintEditor implements IPaintEditor {
  undo() {
    // const ref = useRef<IPaintEditor | null>(null);
    // Commands.undo(ref);
  }

  redo() {
    // Commands.redo();
  }

  // reset() {
  //   NativePaintBoxReactNative.reset(1);
  // }
  //
  // import(path: string, width?: number, height?: number) {
  //   NativePaintBoxReactNative.importImage(1, path, width, height);
  // }
  //
  // export(path: string, fileName: string, mimeType: string) {
  //   NativePaintBoxReactNative.export(path, fileName, mimeType, 1);
  // }
  //
  // isEnabled(): Promise<boolean> {
  //   return NativePaintBoxReactNative.isEnabled(1);
  // }
  //
  // setEnabled(value: boolean) {
  //   NativePaintBoxReactNative.setEnabled(value, 1);
  // }
  //
  // setPaintMode(paintMode: string) {
  //   NativePaintBoxReactNative.setPaintMode(paintMode, 1);
  // }
  //
  // getPaintMode(): Promise<string> {
  //   return NativePaintBoxReactNative.getPaintMode(1);
  // }
  //
  // setStrokeColor(strokeColor: string) {
  //   NativePaintBoxReactNative.setStrokeColor(strokeColor, 1);
  // }
  //
  // getStrokeColor() {
  //   return NativePaintBoxReactNative.getStrokeColor(1);
  // }
  //
  // setStrokeSize(size: number) {
  //   return NativePaintBoxReactNative.setStrokeSize(size, 1);
  // }
  //
  // getStrokeSize(): Promise<number> {
  //   return NativePaintBoxReactNative.getStrokeSize(1);
  // }
}
