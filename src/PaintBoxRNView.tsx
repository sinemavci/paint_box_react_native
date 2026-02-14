import PaintBoxView from './PaintBoxViewNativeComponent';
import { StatusBar, StyleSheet, View, type ViewProps } from 'react-native';
import { useEffect, useRef } from 'react';
import { PaintBoxContext } from './PaintBoxContext';
//import type { IPaintEditor } from './IPaintEditor';

export type PaintBoxViewProps = {
  //paintEditor: IPaintEditor;
  id?: string;
  style?: ViewProps;
  children?: React.ReactNode;
  childrenPosition?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
};

export const PaintBoxRNView: React.FC<PaintBoxViewProps> = ({
  id,
  children,
  style,
  childrenPosition,
}: PaintBoxViewProps) => {
  const ref = useRef<React.ElementRef<typeof PaintBoxView>>(null);
  const statusBarHeight = StatusBar.currentHeight;

  useEffect(() => {
    PaintBoxContext.getInstance().addRef({
      id: id,
      ref: ref,
    });
    return () => {
      PaintBoxContext.getInstance().clearRef({
        id: id,
        ref: ref,
      });
    };
  }, [id]);

  return (
    <View style={[styles.root, style]}>
      <View
        style={
          childrenPosition === 'topLeft'
            ? // eslint-disable-next-line react-native/no-inline-styles
              {
                position: 'absolute',
                zIndex: 1,
                top: statusBarHeight,
                left: 12,
              }
            : childrenPosition === 'topRight'
            ? // eslint-disable-next-line react-native/no-inline-styles
              {
                position: 'absolute',
                zIndex: 1,
                top: statusBarHeight,
                right: 12,
              }
            : childrenPosition === 'bottomLeft'
            ? styles.childrenBottomLeft
            : styles.childrenBottomRight
        }
      >
        {children}
      </View>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <PaintBoxView ref={ref} style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    flex: 1,
    height: 'auto',
  },
  childrenTopLeft: { position: 'absolute', zIndex: 1, top: 12, left: 12 },
  childrenTopRight: {
    position: 'absolute',
    zIndex: 1,
    right: 6,
  },
  childrenBottomRight: {
    position: 'absolute',
    zIndex: 1,
    right: 6,
  },
  childrenBottomLeft: {
    position: 'absolute',
    zIndex: 1,
    left: 6,
  },
  matchParent: {
    width: '100%',
    height: '100%',
  },
});
