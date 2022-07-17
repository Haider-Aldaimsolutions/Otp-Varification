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
    const no=(null);
    const sendVarification=()=>{
        if(phoneNumber.length>11){
        const phoneProvider=new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber,recaptchaVarifier.current)
            .then(setVarificationId);
            setPhoneNumber('');
        }
        else{alert("Enter a valid phone number")}
    }
    const confirmCode=()=>{
        const credential=firebase.auth.PhoneAuthProvider.credential(varificationId,code);
        firebase.auth().signInWithCredential(credential)    
        
        .then(()=>{
            setCode("");
        })
        .catch((error)=>{
            if(code=="")
            alert("Please enter Code")
            if(code.length<6)
            alert("Please enter 6 Digit Code")
            else
            alert(error)
            
        })
        if(!{Error})
        Alert.alert("Login Successfull");
    }

  return (
    <View style={styles.container}>
      
      <FirebaseRecaptchaVerifierModal
      ref={recaptchaVarifier}
      firebaseConfig={firebaseConfig}
      />
      <Text style={styles.header}  >
        OTP Varification
      </Text>
      <TextInput
      placeholder='Enter Phone Number with Country Code'
      onChangeText={setPhoneNumber}
      no={no+phoneNumber}
      keyboardType="phone-pad"
      placeholderTextColor={"#0782e0"}
      autoComplete='tel'
      style={styles.TextInput}
      />
      
      <TouchableOpacity style={styles.button} onPress={()=>sendVarification(phoneNumber)}>
            <Text style={styles.buttonText}>
                Send Varification
            </Text>
      </TouchableOpacity>


      <TextInput
      placeholder='Enter Confirmation Code'
      onChangeText={setCode}
      keyboardType="number-pad"
      placeholderTextColor={"#0782e0"}
      style={styles.TextInput}
      />
     
      <TouchableOpacity style={styles.button} onPress={confirmCode}>
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
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop:200,
  },
  header:{
    fontSize:30,
    color:'#0782e0',
    fontWeight:'900',

  },
  TextInput:{
    borderWidth:2,
    borderColor:'#0782e0',
    padding:10,
    margin:10,
    borderRadius:10,
    backgroundColor:'#eee',
    color:'#0782e0'
    
  },
  button:{
    borderWidth:2,
    borderColor:'#0782e0',
    padding:10,
    color:'white',
    margin:10,
    borderRadius:10,
    backgroundColor:'#0782e0',
    color:"white"
  },
  buttonText:{
    color:'white',
  }

});
