import { Dimensions, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { clamp, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

export function ExamplePinchGesture() {
    const scale = useSharedValue(1);
    const start = useSharedValue(0);

    const gesture = Gesture.Pinch()
        .onStart(() => {
            start.value = scale.value;
        })
        .onUpdate((e) => {
            scale.value = clamp(
                e.scale * start.value,
                0.5,
                Math.min(width / 100, height / 100)
            );
        });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value }
            ]
        }
    });

    return <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.box, animatedStyles]} />
    </GestureDetector>;
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: "blue",
    }
});