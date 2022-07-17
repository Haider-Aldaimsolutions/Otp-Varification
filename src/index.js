import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text,TouchableOpacity, View } from 'react-native';
import React,{ useRef,useState } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';
import { TextInput } from 'react-native';

export default function Otp() {
    const [phoneNumber,setPhoneNumber]=useState("");
    const [code,setCode]=useState("");
    const [varificationId,setVarificationId]=useState(null);
    const recaptchaVarifier=useRef(null);
    const sendVarification=()=>{
        const phoneProvider=new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber,recaptchaVarifier.current)
            .then(setVarificationId);
            setPhoneNumber("");
        
    }
    const confirmCode=()=>{
        const credential=firebase.auth.PhoneAuthProvider.credential(varificationId,code);
        firebase.auth().signInWithCredential(credential)    
        
        .then(()=>{
            setCode("");
        })
        .catch((error)=>{
            alert(error)
        })
        Alert.alert("Login Successfull");
    }

  return (
    <View style={styles.container}>
      
      <FirebaseRecaptchaVerifierModal
      ref={recaptchaVarifier}
      firebaseConfig={firebaseConfig}
      />
      <Text style={styles.header}>
        Otp Varification
      </Text>
      <TextInput
      placeholder='Enter Phone Number with Country Code'
      onChangeText={setPhoneNumber}
      keyboardType="phone-pad"
      autoComplete='tel'
      style={styles.TextInput}
      />
      <TouchableOpacity style={styles.sendVarification} onPress={sendVarification}>
            <Text style={styles.buttonText}>
                Send Varification
            </Text>
      </TouchableOpacity>


      <TextInput
      placeholder='Enter Confirmation Code'
      onChangeText={setCode}
      keyboardType="number-pad"
      style={styles.TextInput}
      />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
            <Text style={styles.buttonText}>
                Confirm Varification
            </Text>
      </TouchableOpacity>
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
