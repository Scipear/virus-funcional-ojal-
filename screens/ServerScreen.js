import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Server } from "socket.io";
import { createServer } from "http";
import * as Network from "expo-network";

export default function ServerScreen({ navigation }){
    const [ip, setIp] = useState("");

    useEffect(() => {
        const getIP = async () => {
            const ipAddress = await Network.getIpAddressAsync();
            setIp(ipAddress);
        }

        getIP();
        iniciarServidor();
    }, []);

    const iniciarServidor = async () => {
        const server = createServer();
        const ioServer = new Server(server, {cors: { origin: "*" }});
    
        ioServer.on("connection", (socket) => {
            console.log("Cliente conectado:", socket.id);
    
            socket.on("mensaje", (data) => {
                console.log("Mensaje recibido:", data);
                ioServer.emit("mensaje", data);
            });
    
            socket.on("disconnect", () => {
                console.log("Cliente desconectado:", socket.id);
            });
        });
    
        server.listen(3000, () => {
          console.log(`Servidor corriendo en ${ip}:3000`);
          Alert.alert("Servidor Iniciado", `Escuchando en ${ip}:3000`);
        });
    
    };

    return(
        <View style={styles.container}>
            <Text>Tu direccion IP es: {ip}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});