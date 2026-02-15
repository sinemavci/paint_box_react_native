import type { IPaintEditor } from './IPaintEditor';
import type { PaintEditor } from './PaintEditor';

export type PaintBoxContextModel = {
  ref?: React.RefObject<any> | null;
  controller?: IPaintEditor;
};

export class PaintBoxContext {
  private static instance: PaintBoxContext;
  listOfRef: Array<PaintBoxContextModel> = [];

  private constructor() {}

  public static getInstance(): PaintBoxContext {
    if (!PaintBoxContext.instance) {
      PaintBoxContext.instance = new PaintBoxContext();
    }
    return PaintBoxContext.instance;
  }

  getRef(controller?: PaintEditor) {
    if (this.listOfRef.length > 1) {
      if (controller) {
        return this.foundedRef(controller);
      } else {
        throw new Error('Ref model must be required!');
      }
    } else {
      if (controller) {
        return this.foundedRef(controller);
      } else {
        return this.listOfRef[0]?.ref;
      }
    }
  }

  addRef(ref?: PaintBoxContextModel) {
    if (ref) {
      this.listOfRef.push(ref);
    }
  }

  async clearRefs() {
    this.listOfRef = [];
  }

  clearRef(ref: IPaintEditor) {
    const foundedRef = this.foundedRef(ref);
    if (!foundedRef) {
      this.listOfRef = this.listOfRef.filter(
        (model) => ref.id === model.controller?.id
      );
    }
  }

  private foundedRef(refModel: IPaintEditor) {
    const foundedRef = this.listOfRef.find(
      (value) => value?.controller === refModel
    )?.ref;
    if (foundedRef) {
      return foundedRef;
    } else {
      throw new Error('No map found with this id or ref!');
    }
  }
}
