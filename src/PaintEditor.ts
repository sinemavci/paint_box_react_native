import type { IPaintEditor } from './IPaintEditor';
import { PaintBoxContext, type PaintBoxContextModel } from './PaintBoxContext';
import { Commands, type PaintBoxRef } from './PaintBoxViewNativeComponent';

export class PaintEditor implements IPaintEditor {
  private readonly context?: PaintBoxContextModel;
  constructor(_context?: PaintBoxContextModel) {
    this.context = _context;
  }

  _ref(): React.RefObject<PaintBoxRef> | null | undefined {
    return (this.context?.ref ??
      PaintBoxContext.getInstance().getRef(this.context)) as
      | React.RefObject<PaintBoxRef>
      | null
      | undefined;
  }

  undo() {
    const refObj = this._ref();
    console.log(`undooo: ${refObj?.current}`); //undefined geliyor
    console.log(`undooo: ${refObj}`); //dolugeliyor
    if (refObj?.current) {
      console.log('ref hereee');
      Commands.undo(refObj.current);
    }
  }

  redo() {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.redo(refObj.current);
    }
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
