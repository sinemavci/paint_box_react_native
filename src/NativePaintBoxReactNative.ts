import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  isEnable(viewTag: number | null): Promise<boolean>;

  getPaintMode(viewTag: number | null): Promise<string>;

  getStrokeColor(viewTag: number | null): Promise<string>;

  getStrokeSize(viewTag: number | null): Promise<number>;

  export: (
    viewTag: number | null,
    path: string,
    mimeType: string,
    fileName: string
  ) => Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('PaintBoxReactNative');
