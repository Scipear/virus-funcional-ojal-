import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';

export default function ClientServer({ navigation }){
    const [message, setMessage] = useState('');
    const [ipServer, setIpServer] = useState('');

    const connectToServer = (ip) => {
        const socket = new TcpSocket(ip, 8080); // Reemplaza con la IP y puerto de tu servidor

        socket.connect(); //Conexión explícita

        socket.on('connect', () => {
            console.log('Conectado al servidor');
            socket.write('Hola desde React Native!');
        });

        socket.on('data', (data) => {
            setMessage(data.toString());
        });

        socket.on('close', () => {
            console.log('Desconectado del servidor');
        });

        socket.on('error', (error) => {
            console.error('Error:', error);
        });

        return () => {
            socket.destroy(); //Importante cerrar el socket al desmontar el componente.
        };
    };
    
    return (
        <View style={styles.container}>
            <TextInput style={styles.textField} placeholder='Direccion del servidor' value={ipServer} onChangeText={(value) => setIpServer(value)}></TextInput>
            <Pressable onChange={() => connectToServer(ipServer)}>
                <Text>Iniciar</Text>
            </Pressable>
            <Text>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textField:{
        width: 260,
        height: 45,
        borderRadius: 15,
        backgroundColor: '#d0d3d4',
        //position: 'absolute',
        //bottom: '22%',
        //justifyContent: 'center',
        marginBottom: 10,
    }
})