import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Button } from "react-native";

export default function App() {
  const [book, setBook] = useState([]);

  const [search, setSearch] = useState("");

  const getBookData = (search) => {
    fetch(`https://hn.algolia.com/api/v1/search?query=chave/${search}`)
      .then((resposta) => resposta.json())
      .then((data) => {
        const products = data.hits;
        console.log(products.title);
        setBook(products);
      });
  };

  return (
    <View>
      <StatusBar style="auto" />

      <View style={styles.title}>
        <h1>Livraria do Torres</h1>
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
          <li>Autor: {books.author}</li>
          <li>Título: {books.title}</li>
          <li>URL: {books.url}</li>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
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
    border: "solid",
    height: 35,
  },

  result: {
    flex: 1,
    marginBottom: 15,
    width: "100%",
    minHeight: 120,
    border: "solid",
    justifyContent: "flex-end",
    marginTop: 15,
  },
});
