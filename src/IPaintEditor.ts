import { Color, PaintMode } from './model';

export interface IPaintEditor {
  undo(): void;

  redo(): void;

  reset(): void;

  import(path: string, width?: number, height?: number): void;

  export(path: string, fileName: string, mimeType: string): void;

  isEnable(): Promise<boolean>;

  setEnable(value: boolean): void;

  setPaintMode(paintMode: PaintMode): void;

  getPaintMode(): Promise<PaintMode>;

  setStrokeColor(strokeColor: Color): void;

  getStrokeColor(): Promise<Color>;

  setStrokeSize(size: number): void;

  getStrokeSize(): Promise<number>;
}
