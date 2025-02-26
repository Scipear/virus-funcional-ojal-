import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TcpSocket from 'react-native-tcp-socket';


export default function ServerScreen({ navigation }){
    const [ip, setIp] = useState("");

    useEffect(() => {
        const getIP = async () => {
            const ipAddress = await Network.getIpAddressAsync();
            setIp(ipAddress);
        }

        const startServer = async () => {
            const server = new TcpSocket.Server(8080);

            server.listen(() => {
                console.log('Servidor escuchando en el puerto 8080');
            });

            server.on('connection', (socket) => {
                console.log('Cliente conectado');
                socket.on('data', (data) => {
                    console.log('Mensaje del cliente:', data.toString());
                    socket.write('Hola desde el servidor!');
                });
                socket.on('close', () => {
                    console.log('Cliente desconectado');
                });

                socket.on('error', (error) => {
                    console.error('Error del socket:', error);
                });
            });

            server.on('error', (error) => {
                console.error('Error del servidor:', error);
            });

            return () => {
                server.close(); //Cerrar el servidor correctamente
            };
        };

        getIP();
        startServer();
    }, []);

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