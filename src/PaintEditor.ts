import type { IPaintEditor } from './IPaintEditor';
import { PaintBoxContext, type PaintBoxContextModel } from './PaintBoxContext';
import { Commands, type PaintBoxRef } from './PaintBoxViewNativeComponent';
import { Color, MimeType, PaintMode } from './model';
import { ColorDTO } from './dto/ColorDTO';

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
    if (refObj?.current) {
      Commands.undo(refObj.current);
    }
  }

  redo() {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.redo(refObj.current);
    }
  }

  reset() {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.reset(refObj.current);
    }
  }

  import(path: string, width?: number, height?: number) {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.importImage(refObj?.current, path, width, height);
    }
  }

  export(path: string, fileName: string, mimeType: MimeType) {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.export(refObj?.current, path, fileName, mimeType);
    }
  }

  // isEnabled(): Promise<boolean> {
  //   return NativePaintBoxReactNative.isEnabled(1);
  // }
  //
  setEnable(value: boolean) {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.setEnable(refObj?.current, value);
    }
  }

  setPaintMode(paintMode: PaintMode) {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.setPaintMode(refObj?.current, paintMode);
    }
  }

  // getPaintMode(): Promise<string> {
  //   return NativePaintBoxReactNative.getPaintMode(1);
  // }
  //
  setStrokeColor(strokeColor: Color) {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.setStrokeColor(
        refObj?.current,
        ColorDTO.fromDataModel(strokeColor).toJSONString()
      );
    }
  }

  // getStrokeColor() {
  //   return NativePaintBoxReactNative.getStrokeColor(1);
  // }
  //
  setStrokeSize(size: number) {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.setStrokeSize(refObj?.current, size);
    }
  }

  // getStrokeSize(): Promise<number> {
  //   return NativePaintBoxReactNative.getStrokeSize(1);
  // }
}
