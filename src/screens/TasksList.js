import { View, Text, Button } from 'react-native';

export default function TasksList({ navigation }) {
  return (
    <View>
        <Text>Lista de tarefas</Text>
        <Button onPress={() => navigation.navigate('Details')} title="Ir para Detalhes"/>
    </View>
  );
}