import { Alert } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export function ExamplePaper() {
    const onPress = () => {
        Alert.alert("Alerta!", "Você clicou no botão.");
    };

    return <Card>
        <Card.Title title="Esse é o título do card" />
        <Card.Content>
            <Text>O conteúdo</Text>
        </Card.Content>
        <Card.Actions>
            <Button
                onPress={onPress}
                mode="contained"
                icon="account-cowboy-hat"
            >Clique aqui!</Button>
        </Card.Actions>
    </Card>
}