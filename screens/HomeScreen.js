import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
} from "react-native";
import { auth } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const [textColor, setTextColor] = useState("#000"); // Initial text color

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Change text color once the fade-in animation completes
      setTextColor("#FF6347"); // Change to a new color, e.g., Tomato red
    });
  }, [fadeAnim]);

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* Fading animated text with color change */}
      <Animated.Text
        style={[styles.animatedText, { opacity: fadeAnim, color: textColor }]}
      >
        Welcome to the Home Screen!
      </Animated.Text>

      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleLogOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.draggableBox]}
      >
        <Text style={styles.boxText}>Drag Me!</Text>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  draggableBox: {
    width: 100,
    height: 100,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 40,
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
  },
});
