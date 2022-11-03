import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Voice from '@react-native-community/voice';


const App = () => {

  const [result, setResult] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
  }
  const onSpeechEndHandler = (e) => {
    setLoading(false)
    console.log("stop handler", e)
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    console.log("speech result handler", e)
  }

  const startRecording = async () => {
    setLoading(true)
    try {
      await Voice.start('en-Us')
    } catch (error) {
      console.log("error raised", error)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error raised", error)
    }
  }


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Dictation App</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            multiline={true}
            style={{ color:'black', fontSize: 20, textAlignVertical: 'top' }}
            value={result}
            placeholder="your text"
            onChangeText={text => setResult(text)}
          />
          
        </View>
        {isLoading ? <ActivityIndicator size="large" color="red" />

:

<TouchableOpacity
  onPress={startRecording}
><Text style={{ fontSize: 50, alignSelf: 'center', marginTop: 25 }}>🎙️</Text>
  {/* <Image
    source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png' }}
    style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 25, backgroundColor: '#888888', borderRadius: 50 }}
  /> */}
</TouchableOpacity>}
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 24,
            backgroundColor: 'red',
            padding: 8,
            borderRadius: 4
          }}
          onPress={stopRecording}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Stop</Text>
        </TouchableOpacity>       
        <Text style={{ color: '#888888', fontSize: 20, marginTop: 25 }} >Simple dictation app to record your thoughts, or any other voice-to-text use. Press the microphone icon to convert speech to text, then copy the created text and paste in your email, text, notes, etc. Built with React Native</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 40
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    color: 'violet',
    fontSize: 26
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 200,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    color: '#000000',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4
  }
});

export default App;
