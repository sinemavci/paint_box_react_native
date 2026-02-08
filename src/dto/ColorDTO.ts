import { BaseDTO } from './BaseDTO';
import { Color } from '../model';

export class ColorDTO extends BaseDTO {
  red: number;
  green: number;
  blue: number;
  alpha?: number;

  constructor(red: number, green: number, blue: number, alpha?: number) {
    super();
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  static fromDataModel(color: Color) {
    return new ColorDTO(color.red, color.green, color.blue, color.alpha);
  }

  static fromJSON(json: string) {
    const parsedJson = JSON.parse(json);
    return new ColorDTO(
      parsedJson.red,
      parsedJson.green,
      parsedJson.blue,
      parsedJson.alpha
    );
  }

  toDataModel(): Color {
    return new Color(this.red, this.green, this.blue, this.alpha);
  }

  toJSON() {
    return {
      red: this.red,
      green: this.green,
      blue: this.blue,
      alpha: this.alpha,
    };
  }
}
