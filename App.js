import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import PhotoFrame from './PhotoFrame';
import PhotoGrid from './PhotoGrid';
import { useWindowDimensions } from 'react-native';

export default function CameraApp() {
  const [camPermission, setCamPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [onetime, setOneTime] = useState(true);
  const [aphoto, setPhoto] = useState('assets/snack-icon.png');
  const [photolist, setPhotoList] = useState([]);
  const [viewMode, setViewMode] = useState(false);
  const picNum = useRef(1);

  const Width = useWindowDimensions().width;
  const Height = useWindowDimensions().height;
  
  useEffect(() => {
    if (onetime) {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCamPermission(status === 'granted');
      })();
      setOneTime(false);
    }
  }, );  // called after every redraw.

  if (camPermission === null || camPermission === false) {  // if no permission, show warning
    return <View><Text>Unable to use app without camera permissions.</Text></View>;
  }

  var mainstyle = {
    flex: 4,
    margingTop: 50,
    flexDirection: "column",
    borderWidth: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  };
  
  if (Width > Height) {
    mainstyle = {
      flex: 4,
      paddingTop: 0,
      paddingLeft: 10,
      flexDirection: "row",
      borderWidth: 5,
      backgroundColor: '#fff',
      alignItems: 'center',
    };
  }

  async function takePicture() {
     if (this.SnapCamera) {
        let photo = await this.SnapCamera.takePictureAsync({ quality: 0.5, base64: true });
        photo.name="Photo #" + (picNum.current);
        picNum.current++;
        setPhoto(photo.uri);
        setPhotoList([...photolist, photo]);
     }
  }

  function switchMode() {
    if (viewMode) {setViewMode(false);}
    else {setViewMode(true);}
  }
 
  var camui = <Text> Major Failure</Text>;
  if (viewMode) {
    camui = (
      <View style={mainstyle}>
          <Camera ref={ref => {this.SnapCamera = ref}} style={styles.camera} type={type} />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => {takePicture()}}>
              <Text> Snap </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text > Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {switchMode();  }}>
              <Text > Switch </Text>
            </TouchableOpacity>
          </View>
          <PhotoGrid photolist={photolist} source={{uri: aphoto}} />
      </View>
    );
  }
  else {
    camui = <View style={mainstyle}>
         <Camera 
           ref={ref => {this.SnapCamera = ref}} style={styles.camera} type={type}/>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {takePicture()}}
          >
            <Text style={styles.bstyle}> Snap </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === Camera.Constants.Type.back ?
                               Camera.Constants.Type.front :
                               Camera.Constants.Type.back
                     );
            }}>
            <Text  style={styles.bstyle}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {switchMode()}}>
            <Text  style={styles.bstyle}> Switch </Text>
          </TouchableOpacity>
        </View>
        <PhotoFrame photolist={photolist} source={{uri: aphoto}} />
     </View>
  }
  return (camui);
}

const styles = StyleSheet.create({
  camera: {
    flex: 4,
    height: 300,
    width: "80%",
    padding: 5,
    borderWidth: 6,
    objectFit: 'cover',
  },
  bstyle: {
    padding: 0
  },
  buttonRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      padding: 0,
      paddingTop: 0,
      margin: 5
  }, 
});
