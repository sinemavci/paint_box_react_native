import { PaintBoxRNView, PaintEditor } from 'paint_box_react_native';
import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Popover from 'react-native-popover-view';
import { useEffect, useState } from 'react';
import { Placement } from 'react-native-popover-view/dist/Types';
import { IconButton, PaperProvider, Snackbar, Text, Button } from 'react-native-paper';
import { PaperDropdown } from './component/PaperDropdown';
import { Color, MimeType, PaintMode } from '../../src/model';
import { DocumentDirectoryPath } from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';

const paintModes = new Map<PaintMode, string>([
  [PaintMode.PEN, 'pen'],
  [PaintMode.BRUSH, 'brush'],
  [PaintMode.BUCKET, 'format-color-fill'],
  [PaintMode.ERASER, 'eraser'],
  [PaintMode.MARKER, 'format-paint'],
]);

const generateColors = [
  "#000000",
  "#808080",
  "#FFFFFF",
  "#800000",
  "#FF0000",
  "#808000",
  "#FFFF00",
  "#008000",
  "#00FF00",
  "#008080",
  "#00FFFF",
  "#000080",
  "#eb7f14ff",
  "#800080",
  "#FF00FF"
];

const hexToRgb = (hex: string) => {
  const cleanHex = hex.replace("#", "");

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  console.log('r', r, 'g', g, 'b', b);

  return new Color(r, g, b, 1);
};

export default function App() {
  const paintEditor1 = new PaintEditor();
  const paintEditor2 = new PaintEditor();
  const statusHeight = StatusBar.currentHeight;

  const [showStrokeWidthPopover1, setStrokeWidthShowPopover1] = useState(false);
  const [showStrokeWidthPopover2, setStrokeWidthShowPopover2] = useState(false);
  const [showColorPopover1, setColorShowPopover1] = useState(false);
  const [showColorPopover2, setColorShowPopover2] = useState(false);

  const [visiblePaintMode1, setVisiblePaintMode1] = useState(false);
  const [visiblePaintMode2, setVisiblePaintMode2] = useState(false);

  const [showMimeTypePopover1, setShowMimeTypePopover1] = useState(false);
  const [showMimeTypePopover2, setShowMimeTypePopover2] = useState(false);

  const [paintMode1, setPaintMode1] = useState(PaintMode.PEN);
  const [paintMode2, setPaintMode2] = useState(PaintMode.PEN);

  const [selectedColor1, setSelectedColor1] = useState(generateColors[0]);
  const [selectedColor2, setSelectedColor2] = useState(generateColors[0]);

  const [mimeType1, setMimeType1] = useState(MimeType.png);
  const [mimeType2, setMimeType2] = useState(MimeType.png);

  const [strokeWidth1, setStrokeWidth1] = useState(1);
  const [strokeWidth2, setStrokeWidth2] = useState(1);

  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
  });

  useEffect(() => {
    paintEditor1.isEnable().then((val) => {
      if (val) {
        paintEditor1.getStrokeSize().then((size) => {
          setStrokeWidth1(size);
        });
      }
    });
  }, [paintEditor1]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#D6DDE0',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 8,
              marginHorizontal: 8,
              paddingHorizontal: 8,
              marginTop: statusHeight,
              height: 60,
            }}
          >
            <Icon
              name="reload"
              size={30}
              onPress={() => {
                paintEditor1.reset();
              }}
            />
            <Icon
              name="undo"
              size={30}
              onPress={() => {
                paintEditor1.undo();
              }}
            />
            <Icon
              name="redo"
              size={30}
              onPress={() => {
                paintEditor1.redo();
              }}
            />
            <PaperDropdown
              visible={visiblePaintMode1}
              setVisible={setVisiblePaintMode1}
              value={paintMode1}
              values={[...paintModes.entries()]}
              onSelect={(val) => {
                setPaintMode1(val);
                paintEditor1.setPaintMode(val);
              }}
              anchor={
                <Icon
                  name={paintModes.get(paintMode1) ?? 'pen'}
                  size={30}
                  onPress={() => setVisiblePaintMode1(true)}
                />
              }
            />
            <Popover
              isVisible={showColorPopover1}
              backgroundStyle={{
                backgroundColor: 'transparent',
              }}
              placement={Placement.BOTTOM}
              popoverStyle={{
                elevation: 0,
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowColor: 'transparent',
                backgroundColor: '#eff2f3ff',
              }}
              onRequestClose={() => setColorShowPopover1(false)}
              from={
                <View>
                  <Icon
                    name="circle"
                    size={32}
                    color={selectedColor1}
                    onPress={async () => {
                      setColorShowPopover1(true);
                    }}
                  />
                </View>
              }
            >
              <View style={{ width: 160, justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {generateColors.map((c, i) => (
                  <Pressable key={i} onPress={async () => {
                    setSelectedColor1(c);
                    const mapraysColor = hexToRgb(c);
                    await paintEditor1.setStrokeColor(new Color(mapraysColor.red, mapraysColor.green, mapraysColor.blue));
                  }
                  } >
                    <Icon
                      name="circle"
                      size={40}
                      color={c}
                      style={{
                        borderWidth: selectedColor1 === c ? 0.4 : 0,
                        borderColor: '#000',
                        borderRadius: 20
                      }}
                    />
                  </Pressable>
                ))}

              </View>
            </Popover>
            <Popover
              isVisible={showStrokeWidthPopover1}
              backgroundStyle={{
                backgroundColor: 'transparent',
              }}
              placement={Placement.BOTTOM}
              popoverStyle={{
                elevation: 0,
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowColor: 'transparent',
                backgroundColor: '#eff2f3ff',
              }}
              onRequestClose={() => setStrokeWidthShowPopover1(false)}
              from={
                <View>
                  <Icon
                    name="format-line-weight"
                    color={selectedColor1}
                    size={32}
                    onPress={async () => {
                      setStrokeWidthShowPopover1(true);
                    }}
                  />
                </View>
              }
            >
              <View style={{ width: 140, justifyContent: 'center', flexDirection: 'row' }}>
                <IconButton icon={'minus'} onPress={() => {
                  const newSize = strokeWidth1 - 1;
                  setStrokeWidth1(newSize);
                  paintEditor1.setStrokeSize(newSize);
                }} />
                <Text style={{ alignSelf: 'center', marginHorizontal: 8 }}>{strokeWidth1}</Text>
                <IconButton icon={'plus'} onPress={() => {
                  const newSize = strokeWidth1 + 1;
                  setStrokeWidth1(newSize);
                  paintEditor1.setStrokeSize(newSize);
                }} />

              </View>
            </Popover>
            <Icon
              name="upload"
              size={32}
              onPress={async () => {
                launchImageLibrary({
                  mediaType: 'photo',
                  selectionLimit: 1,
                }, async response => {
                  if (response.assets?.length !== 0) {
                    console.log("assets", response.assets![0]!.uri!!);
                    paintEditor1.import(response.assets![0]!.uri!!.replace("file://", ""), 600, 800);
                    console.log(response.assets?.[0]);
                  }
                });
              }}
            />
            <Popover
              isVisible={showMimeTypePopover1}
              backgroundStyle={{
                backgroundColor: 'transparent',
              }}
              placement={Placement.BOTTOM}
              popoverStyle={{
                elevation: 0,
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowColor: 'transparent',
                backgroundColor: '#eff2f3ff',
              }}
              onRequestClose={() => setShowMimeTypePopover1(false)}
              from={
                <View>
                  <Icon
                    name={'folder-outline'}
                    size={30}
                    onPress={() => setShowMimeTypePopover1(true)}
                  />
                </View>
              }
            >
              <View style={{ width: 200, height: 240, alignItems: 'center', justifyContent: 'center' }}>
                {
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {Object.values(MimeType).map((it) =>
                      <Button key={it} mode={it === mimeType1 ? 'contained-tonal' : 'text'} style={{ borderRadius: 8, marginHorizontal: 8, marginTop: 4, width: 80 }} onPress={() => {
                        setMimeType1(it);
                      }} >{it}
                      </Button>
                    )}
                  </View>
                }
                <Text>Exported file will be saved as </Text>
                <Text>export.{mimeType1}</Text>
                <Button mode={'contained-tonal'} style={{ borderRadius: 8, margin: 8 }} onPress={() => {
                  try {
                    paintEditor1.export(DocumentDirectoryPath, 'export', mimeType1);
                    setSnackbar({
                      visible: true,
                      message: `File saved in ${DocumentDirectoryPath}/export.${mimeType1}`,
                    });
                  } catch (err) {
                    console.error(err);
                    setSnackbar({
                      visible: true,
                      message: 'File can not be saved',
                    });
                  }
                }}> EXPORT </Button>
              </View>
            </Popover>
          </View>
          <PaintBoxRNView
            paintEditor={paintEditor1}
          // onPaintBoxReady={async () => {
          //   paintEditor1.isEnable().then((val) => {
          //     console.log('isEnabled 1', val);
          //   });
          // }}
          />
        </View>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#D6DDE0',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 8,
              marginHorizontal: 8,
              paddingHorizontal: 8,
              marginVertical: 8,
              height: 60,
            }}
          >
            <Icon
              name="reload"
              size={30}
              onPress={() => {
                paintEditor2.reset();
              }}
            />
            <Icon
              name="undo"
              size={30}
              onPress={() => {
                paintEditor2.undo();
              }}
            />
            <Icon
              name="redo"
              size={30}
              onPress={() => {
                paintEditor2.redo();
              }}
            />
            <PaperDropdown
              visible={visiblePaintMode2}
              setVisible={setVisiblePaintMode2}
              value={paintMode2}
              values={[...paintModes.entries()]}
              onSelect={(val) => {
                setPaintMode2(val);
                paintEditor2.setPaintMode(val);
              }}
              anchor={
                <Icon
                  name={paintModes.get(paintMode2) ?? 'pen'}
                  size={30}
                  onPress={() => setVisiblePaintMode2(true)}
                />
              }
            />
            <Popover
              isVisible={showColorPopover2}
              backgroundStyle={{
                backgroundColor: 'transparent',
              }}
              placement={Placement.BOTTOM}
              popoverStyle={{
                elevation: 0,
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowColor: 'transparent',
                backgroundColor: '#eff2f3ff',
              }}
              onRequestClose={() => setColorShowPopover2(false)}
              from={
                <View>
                  <Icon
                    name="circle"
                    size={32}
                    color={selectedColor2}
                    onPress={async () => {
                      setColorShowPopover2(true);
                    }}
                  />
                </View>
              }
            >
              <View style={{ width: 160, justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {generateColors.map((c, i) => (
                  <Pressable key={i} onPress={async () => {
                    setSelectedColor2(c);
                    const mapraysColor = hexToRgb(c);
                    await paintEditor2.setStrokeColor(new Color(mapraysColor.red, mapraysColor.green, mapraysColor.blue));
                  }
                  } >
                    <Icon
                      name="circle"
                      size={40}
                      color={c}
                      style={{
                        borderWidth: selectedColor2 === c ? 0.4 : 0,
                        borderColor: '#000',
                        borderRadius: 20
                      }}
                    />
                  </Pressable>
                ))}

              </View>
            </Popover>
            <Popover
              isVisible={showStrokeWidthPopover2}
              backgroundStyle={{
                backgroundColor: 'transparent',
              }}
              placement={Placement.BOTTOM}
              popoverStyle={{
                elevation: 0,
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowColor: 'transparent',
                backgroundColor: '#eff2f3ff',
              }}
              onRequestClose={() => setStrokeWidthShowPopover2(false)}
              from={
                <View>
                  <Icon
                    name="format-line-weight"
                    color={selectedColor2}
                    size={32}
                    onPress={async () => {
                      setStrokeWidthShowPopover2(true);
                    }}
                  />
                </View>
              }
            >
              <View style={{ width: 140, justifyContent: 'center', flexDirection: 'row' }}>
                <IconButton icon={'minus'} onPress={() => {
                  const newSize = strokeWidth1 - 1;
                  setStrokeWidth2(newSize);
                  paintEditor2.setStrokeSize(newSize);
                }} />
                <Text style={{ alignSelf: 'center', marginHorizontal: 8 }}>{strokeWidth1}</Text>
                <IconButton icon={'plus'} onPress={() => {
                  const newSize = strokeWidth1 + 1;
                  setStrokeWidth2(newSize);
                  paintEditor2.setStrokeSize(newSize);
                }} />

              </View>
            </Popover>
            <Icon
              name="upload"
              size={32}
              onPress={async () => {
                launchImageLibrary({
                  mediaType: 'photo',
                  selectionLimit: 1,
                }, async response => {
                  if (response.assets?.length !== 0) {
                    paintEditor2.import(response.assets![0]!.uri!!.replace("file://", ""), 600, 800);
                  }
                });
              }}
            />
            <Popover
              isVisible={showMimeTypePopover2}
              backgroundStyle={{
                backgroundColor: 'transparent',
              }}
              placement={Placement.BOTTOM}
              popoverStyle={{
                elevation: 0,
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowColor: 'transparent',
                backgroundColor: '#eff2f3ff',
              }}
              onRequestClose={() => setShowMimeTypePopover2(false)}
              from={
                <View>
                  <Icon
                    name={'folder-outline'}
                    size={30}
                    onPress={() => setShowMimeTypePopover2(true)}
                  />
                </View>
              }
            >
              <View style={{ width: 200, height: 240, alignItems: 'center', justifyContent: 'center' }}>
                {
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {Object.values(MimeType).map((it) =>
                      <Button key={it} mode={it === mimeType2 ? 'contained-tonal' : 'text'} style={{ borderRadius: 8, marginHorizontal: 8, marginTop: 4, width: 80 }} onPress={() => {
                        setMimeType2(it);
                      }} >{it}
                      </Button>
                    )}
                  </View>
                }
                <Text>Exported file will be saved as </Text>
                <Text>export.{mimeType2}</Text>
                <Button mode={'contained-tonal'} style={{ borderRadius: 8, margin: 8 }} onPress={() => {
                  try {
                    paintEditor2.export(DocumentDirectoryPath, 'export', mimeType2);
                    setSnackbar({
                      visible: true,
                      message: `File saved in ${DocumentDirectoryPath}/export.${mimeType2}`,
                    });
                  } catch (err) {
                    console.error(err);
                    setSnackbar({
                      visible: true,
                      message: 'File can not be saved',
                    });
                  }
                }}> EXPORT </Button>
              </View>
            </Popover>
          </View>
          <PaintBoxRNView
            paintEditor={paintEditor2}
          // onPaintBoxReady={async () => {
          //   paintEditor1.isEnable().then((val) => {
          //     console.log('isEnabled 1', val);
          //   });
          // }}
          />
          <Snackbar
            duration={3000}
            visible={snackbar.visible}
            onDismiss={() => {
              setSnackbar({
                visible: false,
                message: '',
              });
            }}
          >
            {snackbar.message}
          </Snackbar>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
