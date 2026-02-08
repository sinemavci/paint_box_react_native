export interface IPaintEditor {
  undo(): void;

  redo(): void;

  // reset(): void;
  //
  // import(path: string, width?: number, height?: number): void;
  //
  // export(path: string, fileName: string, mimeType: string): void;
  //
  // isEnabled(): Promise<boolean>;
  //
  // setEnabled(value: boolean): void;
  //
  // setPaintMode(paintMode: string): void;
  //
  // getPaintMode(): Promise<string>;
  //
  // setStrokeColor(strokeColor: string): void;
  //
  // getStrokeColor(): Promise<string>;
  //
  // setStrokeSize(size: number): void;

  // getStrokeSize(): Promise<number>;
}
