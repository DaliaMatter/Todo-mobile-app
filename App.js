import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";

export default function App() {
    const [textInput, setTextInput] = useState("");
    const [todos, setTodos] = useState([]);
    const [action, setaction] = useState("");
    const [toggel, setToggel] = useState(false);

    const addTodo = () => {
        setTodos([...todos, { text: textInput, checked: false }]);
    };

    const toggleChecked = (index) => {
        // console.log(todos[index].checked);

        todos[index].checked = !todos[index].checked;
        // console.log(index);

        setTodos(todos);
        setToggel(!toggel);
        // console.log(todos[index].checked);
    };

    const inputTodo = (value) => {
        setTextInput(value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Todo List</Text>
            <View style={styles.add}>
                <TextInput
                    style={styles.input}
                    placeholder="   Add To-Do"
                    onChangeText={inputTodo}
                    value={textInput}
                />
                <SimpleLineIcons
                    backgroundColor="black"
                    size={40}
                    name="plus"
                    color="#af7ac5"
                    onPress={addTodo}
                ></SimpleLineIcons>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setaction("All")}
                >
                    <Text style={styles.btnTitel}>All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setaction("Active")}
                >
                    <Text style={styles.btnTitel}>Active</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setaction("Done")}
                >
                    <Text style={styles.btnTitel}>Done</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                extraData={{ action, toggel }}
                keyExtractor={(item) => item.text}
                renderItem={({ item, index }) => {
                    if (action == "Active") {
                        return (
                            !item.checked && (
                                <View style={styles.todoss}>
                                    <FontAwesome
                                        name={"square-o"}
                                        size={30}
                                        color={"#af7ac5"}
                                        onPress={() => toggleChecked(index)}
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            textDecorationLine: "none",
                                            color: "#af7ac5",
                                        }}
                                    >
                                        {item.text}
                                    </Text>
                                </View>
                            )
                        );
                    } else if (action == "Done") {
                        return (
                            item.checked && (
                                <View style={styles.todoss}>
                                    <FontAwesome
                                        name={"check-square-o"}
                                        size={30}
                                        color={"black"}
                                        onPress={() => toggleChecked(index)}
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            textDecorationLine: "line-through",
                                            color: "black",
                                        }}
                                    >
                                        {item.text}
                                    </Text>
                                </View>
                            )
                        );
                    } else {
                        return (
                            <View style={styles.todoss}>
                                <FontAwesome
                                    name={
                                        item.checked
                                            ? "check-square-o"
                                            : "square-o"
                                    }
                                    size={30}
                                    color={item.checked ? "black" : "#af7ac5"}
                                    onPress={() => toggleChecked(index)}
                                />
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        fontSize: 20,
                                        textDecorationLine: item.checked
                                            ? "line-through"
                                            : "none",
                                        color: item.checked
                                            ? "black"
                                            : "#af7ac5",
                                    }}
                                >
                                    {item.text}
                                </Text>
                            </View>
                        );
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8daef",
    },
    title: {
        alignSelf: "center",
        marginTop: 90,
        color: "#af7ac5",
        fontWeight: "bold",
        fontSize: 70,
    },
    input: {
        borderWidth: 1,
        borderColor: "#af7ac5",
        width: 250,
        height: 43,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 15,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "center",
    },
    btn: {
        margin: 10,
        padding: 5,
        width: 70,
        height: 35,
        backgroundColor: "#f4ecf7",
        borderRadius: 15,
    },
    add: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    btnTitel: {
        marginLeft: 5,
        justifyContent: "center",
        fontSize: 20,
        color: "#af7ac5",
    },
    todoss: {
        flexDirection: "row",
        width: 200,
        margin: 13,
    },
});
