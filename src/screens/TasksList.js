import { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Pressable, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { FIRESTORE_DB } from '../../firebaseconfig'

export default function TasksList({ navigation }) {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  async function addTask() {
    const doc = await addDoc(collection(FIRESTORE_DB, 'tasks'), { title: task, done: false });
    setTask('');
  }

  function renderTask({ item }) {
    const ref = doc(FIRESTORE_DB, `tasks/${item.id}`);

    async function toogleDone() {
        updateDoc(ref, { done: !item.done });
    }
    
    async function deletItem() {
        deleteDoc(ref);
    }

    return (
        <View style={styles.item}>
            <TouchableOpacity style={styles.buttonItem} onPress={toogleDone}>
                {!item.done && <MaterialIcons name="radio-button-unchecked" size={30} color="black" />}
                {item.done && <Ionicons name="checkmark-circle" size={30} color="green" />}
                <Text style={styles.textItem}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletItem}>
                <MaterialIcons name="delete-outline" size={30} color="red" />
            </TouchableOpacity>
        </View>
    );
  }

  useEffect(() => {
    const taskRef = collection(FIRESTORE_DB, 'tasks');

    const subscriber = onSnapshot(taskRef, {
        next: (snapshot) => {
            console.log("UPDATED");
            const tasks = [];
            snapshot.docs.forEach((doc) => {
                tasks.push({
                    id: doc.id,
                    ...doc.data()
                });
                setTasks(tasks);
            });
        } 
    });

    return () => subscriber();
  }, []);

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.form}>
            <TextInput style={styles.input} placeholder='Adicionar nova tarefa' onChangeText={(task) => setTask(task)} value={task}/>
            <Button onPress={() => addTask()} title='Add' disabled={task === ''}/>
        </View>
        
        {tasks.length > 0 && (
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(task) => task.id}
            />
        )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: '#fff',
        padding: 10,
    }, 
    buttonItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textItem: {
        fontSize: 20,
        marginLeft: 5
    }
});