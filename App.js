import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, FlatList } from "react-native";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Asegúrate de cambiar la IP si pruebas en un dispositivo real

export default function App() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.on("mensaje", (data) => {
      setMensajes((prevMensajes) => [...prevMensajes, data]);
    });

    return () => {
      socket.off("mensaje");
    };
  }, []);

  const enviarMensaje = () => {
    if (mensaje.trim()) {
      socket.emit("mensaje", mensaje);
      setMensaje("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mensajes}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        value={mensaje}
        onChangeText={setMensaje}
        placeholder="Escribe un mensaje"
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginVertical: 10,
        }}
      />
      <Button title="Enviar" onPress={enviarMensaje} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
