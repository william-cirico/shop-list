import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { ExamplePaper } from './screens/ExamplePaper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ExamplePanGesture } from './screens/ExamplePanGesture';
import { ExamplePinchGesture } from './screens/ExamplePinchGesture';
import { ExampleGestureList } from './screens/ExampleGestureList';

const theme: ThemeProp = {
  roundness: 2,
  "colors": {
    "primary": "rgb(165, 200, 255)",
    "onPrimary": "rgb(0, 49, 95)",
    "primaryContainer": "rgb(0, 71, 134)",
    "onPrimaryContainer": "rgb(212, 227, 255)",
    "secondary": "rgb(99, 211, 255)",
    "onSecondary": "rgb(0, 53, 69)",
    "secondaryContainer": "rgb(0, 77, 99)",
    "onSecondaryContainer": "rgb(188, 233, 255)",
    "tertiary": "rgb(79, 216, 235)",
    "onTertiary": "rgb(0, 54, 61)",
    "tertiaryContainer": "rgb(0, 79, 88)",
    "onTertiaryContainer": "rgb(151, 240, 255)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(26, 28, 30)",
    "onBackground": "rgb(227, 226, 230)",
    "surface": "rgb(26, 28, 30)",
    "onSurface": "rgb(227, 226, 230)",
    "surfaceVariant": "rgb(67, 71, 78)",
    "onSurfaceVariant": "rgb(195, 198, 207)",
    "outline": "rgb(141, 145, 153)",
    "outlineVariant": "rgb(67, 71, 78)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(227, 226, 230)",
    "inverseOnSurface": "rgb(47, 48, 51)",
    "inversePrimary": "rgb(0, 95, 175)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(33, 37, 41)",
      "level2": "rgb(37, 42, 48)",
      "level3": "rgb(41, 47, 55)",
      "level4": "rgb(43, 49, 57)",
      "level5": "rgb(46, 52, 62)"
    },
    "surfaceDisabled": "rgba(227, 226, 230, 0.12)",
    "onSurfaceDisabled": "rgba(227, 226, 230, 0.38)",
    "backdrop": "rgba(45, 49, 56, 0.4)"
  }
};

export default function App() {
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <ExampleGestureList />
        </View>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    justifyContent: 'center',
    padding: 48,
  },
});
