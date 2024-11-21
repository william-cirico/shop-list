import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Button, IconButton, Text } from "react-native-paper";
import Animated, { LinearTransition, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const ITEM_HEIGHT = 50;

interface ItemProps {
    id: string;
    text: string;
    onRemove: () => void;
    index: number;
    onDrag: (draggedIndex: number, offsetY: number) => void;
}

function Item({ text, onRemove, onDrag, index }: ItemProps) {
    const translateY = useSharedValue(0);
    const isDragging = useSharedValue(false);

    const gesture = Gesture.Pan()
        .onBegin(() => {
            isDragging.value = true;
        })
        .onUpdate((event) => {
            translateY.value = event.translationY;
            runOnJS(onDrag)(index, event.translationY);
        })
        .onEnd(() => {
            translateY.value = withSpring(0);
            isDragging.value = false;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        zIndex: isDragging.value ? 1 : 0,
        elevation: isDragging.value ? 5 : 1,
    }));

    return <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
            <Text style={styles.text}>{text}</Text>
            <IconButton
                icon="trash-can-outline"
                mode="contained"
                containerColor="red"
                iconColor="white"
                onPress={onRemove}
            />
        </Animated.View>
    </GestureDetector>
}

const styles = StyleSheet.create({
    container: {
        height: ITEM_HEIGHT,
        elevation: 1,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginBottom: 8,
        backgroundColor: "#aaa",
        flexDirection: "row",
    },
    text: {
        flex: 1,
    },
});

export function ExampleGestureList() {
    const [data, setData] = useState([
        { id: "1", text: "Item 1" },
        { id: "2", text: "Item 2" },
    ]);

    const handleAddItem = () => {
        const id = String(Math.floor(Math.random() * 10000));
        setData([{ id, text: `Item ${id}` }, ...data]);
    }

    // Definir a função para remover o item
    const handleRemoveItem = (id: string) => {
        const filteredData = data.filter((item) => item.id !== id);
        setData(filteredData);
    }

    // Atualizar item
    const handleEditItem = (id: string, text: string) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                item.text = text;
            }

            return item;
        });

        setData(updatedData);
    }

    const handleDrag = (fromIndex: number, offsetY: number) => {
        const newIndex = Math.round(
            (fromIndex * ITEM_HEIGHT + offsetY) / ITEM_HEIGHT
        );
        const clampedIndex = Math.max(0, Math.min(newIndex, data.length - 1));

        if (clampedIndex !== fromIndex) {
            const updatedData = [...data];
            const [movedItem] = updatedData.splice(fromIndex, 1);
            updatedData.splice(clampedIndex, 0, movedItem);
            setData(updatedData);
        }
    };

    return (
        <>
            <Animated.FlatList
                data={data}
                renderItem={({ item, index }) => <Item
                    onDrag={handleDrag}
                    index={index}
                    onRemove={() => handleRemoveItem(item.id)}
                    {...item}
                />}
                keyExtractor={(item) => item.id}
                itemLayoutAnimation={LinearTransition}
            />
            <Button
                onPress={handleAddItem}
                mode="contained"
            >Adicionar Item</Button>
        </>
    );
}