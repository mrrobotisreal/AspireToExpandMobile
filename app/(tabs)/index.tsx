import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Text, TextInput } from 'react-native-paper';

import { View } from '@/components/Themed';

export default function TabOneScreen() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <LinearGradient
        style={styles.container}
        colors={["#78290f", "#ff7d00", "#ffbf69", "#cbf3f0", "#2ec4b6", "#006d77", "#001524"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View style={styles.box}>
          <View style={styles.headerBox}>
          <Text variant="bodySmall" style={styles.titleText}>Welcome to...</Text>
          <Text variant="titleLarge" style={{
            ...styles.titleText,
            fontFamily: 'BauhausHeavy',
          }}>Aspire With Alina!</Text>
          </View>
          <Text variant="bodyMedium" style={styles.labelText}>Please enter your email address:</Text>
          <TextInput
            mode='outlined'
            label='Email address'
            onChangeText={setEmailInput}
            value={emailInput}
            style={{ marginBottom: 12, maxHeight: 60 }}
            contentStyle={{ fontFamily: 'BauhausMedium' }}
            outlineStyle={{ borderColor: '#ff7d00' }}
          />
          <Text variant="bodyMedium" style={styles.labelText}>Please enter your password:</Text>
          <TextInput
            mode='outlined'
            label='Password'
            onChangeText={setPasswordInput}
            value={passwordInput}
            style={{ marginBottom: 12, maxHeight: 60 }}
            contentStyle={{ fontFamily: 'BauhausMedium' }}
            outlineStyle={{ borderColor: '#ff7d00' }}
          />
          <View style={styles.bottomBox}>
            <Button labelStyle={{ fontFamily: "BauhausMedium" }} mode='text' textColor='#ff7d00'>NOT REGISTERED YET?</Button>
            <Button labelStyle={{ fontFamily: "BauhausMedium" }} mode='contained' textColor='#001524' buttonColor='#ffbf69'>LOGIN</Button>
          </View>
        </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bottomBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 12,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    minWidth: 360,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBox: {
    marginBottom: 10,
  },
  labelText: {
    color: 'black',
    fontFamily: 'BauhausMedium',
    textAlign: 'left',
  },
  titleText: {
    color: 'black',
    textAlign: 'center',
    // fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'BauhausMedium',
  },
});
