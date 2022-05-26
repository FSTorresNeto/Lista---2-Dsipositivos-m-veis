import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";

export default function App() {
  const [book, setBook] = useState([]);

  const [search, setSearch] = useState("");

  const getBookData = (search) => {
    fetch(`https://hn.algolia.com/api/v1/search?query=chave/${search}`)
      .then((resposta) => resposta.json())
      .then((data) => {
        const products = data.hits;
        setBook(products);
      });
  };

  return (
    <View>
      <StatusBar style="auto" />

      <View style={styles.title}>
        <Text>Livraria do Torres</Text>
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={"Digite aqui"}
          value={search}
          onChangeText={(newText) => setSearch(newText)}
        />
        <Button title="Pesquisar" onPress={() => getBookData(search)} />
      </View>

      {book.map((books) => (
        <View style={styles.result}>
          <Text>
            Autor: {books.author}
            Título: {books.title}
            URL: {books.url}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  textInput: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 35,
  },

  result: {
    flex: 1,
    marginBottom: 3,
    width: "100%",
    minHeight: 120,
    justifyContent: "flex-end",
    marginTop: 15,
  },
});
