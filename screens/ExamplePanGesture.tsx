import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

// callback => É uma função

export function ExamplePanGesture() {
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({
        x: 0,
        y: 0
    });
    const start = useSharedValue({
        x: 0,
        y: 0,
    });

    const gesture = Gesture.Pan()
        .onBegin(() => {
            // Aqui vai o código do início do gesto
            isPressed.value = true;
        })
        .onUpdate((e) => {
            // Aqui vai o código de atualização do gesto

            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })
        .onEnd(() => {
            // Aqui vai o código de finalização do gesto
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
            }
        })
        .onFinalize(() => {
            isPressed.value = false;
        });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: isPressed.value ? 1.2 : 1 },
                { translateX: offset.value.x },
                { translateY: offset.value.y },
            ],
            backgroundColor: isPressed.value ? "orange" : "cyan",
        }
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.ball, animatedStyles]} />
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    ball: {
        height: 50,
        width: 50,
        backgroundColor: "cyan",
        borderRadius: 25,
    },
});