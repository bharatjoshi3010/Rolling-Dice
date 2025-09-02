import { 
  StatusBar, 
  StyleSheet, 
  useColorScheme, 
  View, 
  Text, 
  ImageSourcePropType,
  Image,
  Pressable,
  //now for the animation
  Animated,
  Easing
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

//used to define properties of a component 
import { useState, type JSX, type PropsWithChildren } from 'react';

//importing the images from the assets 
//also added a index.d.ts file om the src folder so that we can define a modeule for the '.png'
import DiceOne from '../assets/dice/one.png'
import DiceTwo from '../assets/dice/two.png'
import DiceThree from '../assets/dice/three.png'
import DiceFour from '../assets/dice/four.png'
import DiceFive from '../assets/dice/five.png'
import DiceSix from '../assets/dice/six.png'

//for reactNative Heptic feedback
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

//defining the dice props component
//basically it is like a abstract class which take care that whenever we make a component using diceProps it have a imageUrl on it 
type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType;
  animationStyle?: any; //for the animation
}>

//for the heptic feedback
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Dice = ({imageUrl, animationStyle}: DiceProps):JSX.Element => {
  return (
    //we changed the 'View' to the 'Animated.View' for the shake of animation 
    <Animated.View style={animationStyle}>  
      <Image style={styles.diceImage} source={imageUrl} />
    </Animated.View>
  )
}


function App() {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne)
  //<ImageSourcePropType> it helps us in assuing the provided value of use state variable is always a image

  //for animation
  const diceAnim = useState(new Animated.Value(0))[0]; //for animation

  const spin = diceAnim.interpolate({
    inputRange: [0,1],
    outputRange: ['0deg', '720deg']
  });

  const spinAndScale = {
  transform: [
    { rotate: spin },
    { scale: diceAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.2, 1] // zoom in then back
    })}
  ]
};

  const rollDiceOnTap = () => {

    //starting rotation animation
    diceAnim.setValue(0);
    Animated.timing(diceAnim, {
      toValue: 1,
      duration: 500, //time taken by the animation to complete
      easing : Easing.out(Easing.ease),
      useNativeDriver : true,
    }).start();

    let randomNumber = Math.floor(Math.random()*6) + 1;
  
    switch (randomNumber) {
      case 1:
        setDiceImage(DiceOne)
        break;
      case 2:
        setDiceImage(DiceTwo)
        break;
      case 3:
        setDiceImage(DiceThree)
        break;
      case 4:
        setDiceImage(DiceFour)
        break;
      case 5:
        setDiceImage(DiceFive)
        break;
      case 6:
        setDiceImage(DiceSix)
        break;
      default :
        setDiceImage(DiceOne)
        break;  
    }

    ReactNativeHapticFeedback.trigger("impactHeavy", options);
    //its to trigger the heptic feedback
  };
  
  return (
    <SafeAreaView style={styles.con}>
      <View style={styles.container}> 
        {/* after adding the annimation the 'Dice' has two perameters on it one is image url and other is animation value */}
        <Dice imageUrl={diceImage} animationStyle={spinAndScale}/> 
      </View>
      <Pressable onPress={() =>{
        rollDiceOnTap()
      }}>
        <Text style={styles.pressableBtnText}>Roll The Dice</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  con:{
    flex :1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  container:{
    justifyContent : 'center',
    alignItems : 'center'
  },
  diceImage:{
    height : 200,
    width : 200,
    // marginBottom: 100
  },
  pressableBtnText:{
    marginTop : 100,
    borderWidth : 2,
    paddingVertical: 10,
    paddingHorizontal : 40,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 10,
    borderColor : '#ee3a3aff',
    fontSize : 18,
    fontWeight : '600',
    color : '#642323ff',
    backgroundColor : '#f3ddddff'
  }
});

export default App;
