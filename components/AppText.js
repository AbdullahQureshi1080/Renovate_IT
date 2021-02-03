import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AppText(props) {
    return (
        // <View>
            <Text style={{...styles.appText,...props.style}}>{props.children}</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    appText:{
        fontFamily:"Poppins-Regular",
        fontSize:12,
    }
})
