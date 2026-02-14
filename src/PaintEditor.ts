import type { IPaintEditor } from './IPaintEditor';
import { PaintBoxContext, type PaintBoxContextModel } from './PaintBoxContext';
import { Commands, type PaintBoxRef } from './PaintBoxViewNativeComponent';
import { Color, MimeType, PaintMode } from './model';
import { ColorDTO } from './dto/ColorDTO';
import NativePaintBoxReactNative from './NativePaintBoxReactNative';
import { findNodeHandle } from 'react-native';
import React from 'react';

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

  export(path: string, fileName: string, mimeType: MimeType): void {
    const refObj = this._ref();
    if (refObj?.current) {
      const viewTag = findNodeHandle(refObj.current);

      // @ts-ignore
      NativePaintBoxReactNative.export(viewTag, path, mimeType, fileName);
    } else {
      throw new Error(
        'Reference not found! Please ensure that the paint box has been created.'
      );
    }
  }

  isEnable(): Promise<boolean> {
    const refObj = this._ref();
    if (refObj?.current) {
      const viewTag = findNodeHandle(refObj.current);
      // @ts-ignore
      return NativePaintBoxReactNative.isEnable(viewTag);
    } else {
      throw new Error(
        'Reference not found! Please ensure that the paint box has been created.'
      );
    }
  }

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

  async getPaintMode(): Promise<PaintMode> {
    const refObj = this._ref();
    if (refObj?.current) {
      const viewTag = findNodeHandle(refObj.current);
      // @ts-ignore
      const response = await NativePaintBoxReactNative.getPaintMode(viewTag);
      const paintMode = Object.values(PaintMode).find((it) => it === response);
      if (paintMode) {
        return Promise.resolve(paintMode);
      } else {
        return Promise.reject(undefined);
      }
    } else {
      throw new Error(
        'Reference not found! Please ensure that the paint box has been created.'
      );
    }
  }

  setStrokeColor(strokeColor: Color) {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.setStrokeColor(
        refObj?.current,
        ColorDTO.fromDataModel(strokeColor).toJSONString()
      );
    }
  }

  async getStrokeColor(): Promise<Color> {
    const refObj = this._ref();
    if (refObj?.current) {
      const viewTag = findNodeHandle(refObj.current);
      // @ts-ignore
      const response = await NativePaintBoxReactNative.getStrokeColor(viewTag);
      return Promise.resolve(ColorDTO.fromJSON(response).toDataModel());
    } else {
      throw new Error(
        'Reference not found! Please ensure that the paint box has been created.'
      );
    }
  }

  setStrokeSize(size: number) {
    const refObj = this._ref();
    if (refObj?.current) {
      Commands.setStrokeSize(refObj?.current, size);
    }
  }

  getStrokeSize(): Promise<number> {
    const refObj = this._ref();
    if (refObj?.current) {
      const viewTag = findNodeHandle(refObj.current);
      // @ts-ignore
      return NativePaintBoxReactNative.getStrokeSize(viewTag);
    } else {
      throw new Error(
        'Reference not found! Please ensure that the paint box has been created.'
      );
    }
  }
}
