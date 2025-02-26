import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ navigation }){
    
    return(
        <View style={styles.container}>
            <Pressable style={styles.serverButtonStyle} onPress={() => navigation.navigate('Server')}>
               <Text>Iniciar como servidor</Text>
            </Pressable>

            <Pressable style={styles.clientButtonStyle} onPress={() => navigation.navigate('Client')}>
               <Text>Iniciar como clinte</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    serverButtonStyle:{
        height: 150,
        width: 150,
        borderRadius: 100,
        backgroundColor: '#4978eb',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    clientButtonStyle:{
        height: 150,
        width: 150,
        borderRadius: 100,
        backgroundColor: '#eb4949',
        alignItems: 'center',
        justifyContent: 'center',
    }
    
})