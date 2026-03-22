# 🎨 paint_box_react_native

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

### Undo

```js
paintEditor.undo();
```

### Redo

```js
paintEditor.redo();
```

### Reset

```js
paintEditor.reset();
```