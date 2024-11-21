import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Animated, { LinearTransition } from "react-native-reanimated";

interface ItemProps {
    id: string;
    text: string;
}

function Item({ text }: ItemProps) {
    return <Animated.View style={styles.container}>
        <Text>{text}</Text>
    </Animated.View>
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        elevation: 2,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginBottom: 8,
    }
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

    return (
        <>
            <Animated.FlatList
                data={data}
                renderItem={({ item, index }) => <Item {...item} />}
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