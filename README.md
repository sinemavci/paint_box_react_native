# 🎨 paint_box_react_native

<p align="center">
  <img src="./assets/demo.gif" width="200" />
</p>

paint_box_react_native is a lightweight drawing component for React Native that allows users to draw on a canvas with customizable brush settings.

## ⚙️ Installation
```sh
npm install paint_box_react_native
```

## 🚀 Usage
```js
import { PaintBoxRNView, PaintEditor } from 'paint_box_react_native';

// ...

<PaintBoxRNView
  paintEditor={paintEditor1}
  onPaintBoxReady={async () => {
  paintEditor1.isEnable().then((val) => {
    if (val) {
        paintEditor1.getStrokeSize().then((size) => {
          setStrokeWidth1(size);
        });
        paintEditor1.getPaintMode().then((mode) => {
          setPaintMode1(mode);
        });
    }
  });
}}
/>
```


## Api Reference

#### 🧠 Core Concepts
PaintEditor

PaintEditor is the controller object used to interact with a specific PaintBoxRNView instance.

Each PaintBoxRNView must have its own PaintEditor instance.

#### ⚠️ Multiple PaintBox Support
You can use multiple paint boxes independently:

```js
const paintEditor1 = new PaintEditor();
const paintEditor2 = new PaintEditor();
```

```js
<PaintBoxRNView paintEditor={paintEditor1} />
<PaintBoxRNView paintEditor={paintEditor2} />
```

#### Undo
Reverts the last drawing action.

```js
paintEditor.undo();
```

#### Redo
Restores the last undone action.

```js
paintEditor.redo();
```

#### Reset
Clears the entire canvas.

```js
paintEditor.reset();
```

#### Import
| Param  | Type   | Required | Description     |
| ------ | ------ | -------- | --------------- |
| path   | string | ✅        | Image file path |
| width  | number | ❌        | Target width    |
| height | number | ❌        | Target height   |

```js
import(path: string, width?: number, height?: number): Promise<void>
```

#### Export
```js
export(path: string, fileName: string, mimeType: MimeType): Promise<string>
```

```js
type MimeType = "jpeg" | "png" | "gif" | "tif" | "bmp" | "pdf";
```

| Param    | Type     | Required | Description                 |
| -------- | -------- | -------- | --------------------------- |
| path     | string   | ✅        | Output directory path       |
| fileName | string   | ✅        | File name without extension |
| mimeType | MimeType | ✅        | Output format               |


#### Enable
```js
isEnable(): Promise<boolean>
setEnable(value: boolean): void
```


#### 🎨 Paint Mode
```js
enum PaintMode {
  PEN = "Pen",
  MARKER = "Marker",
  BUCKET = "Bucket",
  BRUSH = "Brush",
  ERASER = "Eraser"
}
```

```js
getPaintMode(): Promise<PaintMode>
setPaintMode(mode: PaintMode): void
```

#### 🌈 Stroke Color
```js
getStrokeColor(): Promise<Color>
setStrokeColor(color: Color): void
```

Color Definition

```js
class Color {
  constructor(r: number, g: number, b: number)
}
```

#### Stroke Size
```js
getStrokeSize(): Promise<number>
setStrokeSize(size: number): void
```

## ⚙️ Component Props
| Prop            | Type        | Required | Description                 |
| --------------- | ----------- | -------- | --------------------------- |
| paintEditor     | PaintEditor | ✅        | Controller instance         |
| onPaintBoxReady | () => void  | ❌        | Called when canvas is ready |

## Best Practices
- Always create one PaintEditor per PaintBox
- Wait for onPaintBoxReady before calling methods
- Avoid very large stroke sizes (performance impact)

