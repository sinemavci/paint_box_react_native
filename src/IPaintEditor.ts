import { Color, PaintMode } from './model';
import uuid from 'react-native-uuid';

export abstract class IPaintEditor {
  id: string | undefined = uuid.v4();

  abstract undo(): void;

  abstract redo(): void;

  abstract reset(): void;

  abstract import(path: string, width?: number, height?: number): void;

  abstract export(path: string, fileName: string, mimeType: string): void;

  abstract isEnable(): Promise<boolean>;

  abstract setEnable(value: boolean): void;

  abstract setPaintMode(paintMode: PaintMode): void;

  abstract getPaintMode(): Promise<PaintMode>;

  abstract setStrokeColor(strokeColor: Color): void;

  abstract getStrokeColor(): Promise<Color>;

  abstract setStrokeSize(size: number): void;

  abstract getStrokeSize(): Promise<number>;
}
