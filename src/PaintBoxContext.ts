export type PaintBoxContextModel = {
  id?: string;
  ref?: React.RefObject<any> | null;
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

  getRef(ref?: PaintBoxContextModel) {
    if (this.listOfRef.length > 1) {
      if (ref) {
        return this.foundedRef(ref);
      } else {
        throw new Error('Ref model must be required!');
      }
    } else {
      if (ref) {
        return this.foundedRef(ref);
      } else {
        console.log(`hereee: ${this.listOfRef[0]?.ref}`);
        return this.listOfRef[0]?.ref;
      }
    }
  }

  addRef(ref?: PaintBoxContextModel) {
    if (ref) {
      console.log('ref dadded');
      this.listOfRef.push(ref);
    }
  }

  async clearRef() {
    this.listOfRef = [];
  }

  haveARef(contextModel?: PaintBoxContextModel): boolean {
    return this.getRef(contextModel) !== undefined;
  }

  private foundedRef(refModel: PaintBoxContextModel) {
    console.log(`foundedRef ref: ${refModel.ref} id: ${refModel.id}`);
    const foundedRef = this.listOfRef.find(
      (value) => value?.id === refModel?.id || value?.ref === refModel?.ref
    )?.ref;
    if (foundedRef) {
      return foundedRef;
    } else {
      throw new Error('No map found with this id or ref!');
    }
  }
}
