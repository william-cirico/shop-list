import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";

interface Props {
    close: () => void;
    onSave: (text: string) => void;
}

export function AddEditItemModal({ close, onSave }: Props) {
    const [text, setText] = useState("");

    const handleSave = () => {
        onSave(text);
        close();
    }

    return (
        <Portal>
            <Modal 
                visible={true}
                onDismiss={close} 
                contentContainerStyle={style.container}
            >
                <TextInput value={text} onChangeText={setText} />
                <Button onPress={handleSave}>Salvar</Button>
            </Modal>
        </Portal>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    }
});