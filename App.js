import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 30, color: 'red'}}>Loading...</Text>
  </View>
);

const App = () => {
  const [image, setImage] = useState(null);

  console.log(image);

  const takePic = async camera => {
    try {
      const options = {quality: 1, base64: false};
      const data = await camera.takePictureAsync(options);

      setImage(data.uri);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Text>Image is present</Text>
      ) : (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'longer text to use camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio',
            message: 'longer text to use audio',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}>
          {/* options */}
          {({camera, status}) => {
            if (status !== 'READY') return <PendingView />;

            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => takePic(camera)}
                  style={styles.capture}>
                  <Text>SNAP</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0a79df',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'orange',
    padding: 20,
    alignSelf: 'center',
  },
});
