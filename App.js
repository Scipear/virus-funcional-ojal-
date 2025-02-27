import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet, Platform, Text, TextInput, Button, FlatList } from "react-native";
import HomeScreen from './screens/HomeScreen';
import ServerScreen from './screens/ServerScreen';
import ClientScreen from './screens/ClientScreen';
import { io } from "socket.io-client";

// socket = io("http://192.168.101.77:3000"); // Asegúrate de cambiar la IP si pruebas en un dispositivo real
const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    solicitarPermiso();
  }, []);

  const solicitarPermiso = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita acceso a la ubicación para obtener la IP.");
      return;
    }
  };

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{headerShown: false}}/>

          <Stack.Screen 
            name="Server" 
            component={ServerScreen} 
            options={{headerShown: false}}/>
          
          <Stack.Screen 
            name="Cliente" 
            component={ClientScreen} 
            options={{headerShown: false}}/>
            
      </Stack.Navigator>
    </NavigationContainer>
  );
  /*const [mensaje, setMensaje] = useState("");
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
  );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
