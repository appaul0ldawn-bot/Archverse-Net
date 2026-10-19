
Mobile Touch Interface Joystick Integration (MobileJoystick.jsx)

To map mobile touch movement to the character position arrays, add this virtual on-screen joystick layer. It intercepts user multi-touch inputs, extracts vector velocity angles, and transmits them directly down the socket.io-client connection pipeline:
jsx
import React, { useState } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';

export function ARVirtualJoystick({ onMoveMatrixUpdate }) {
  const [stickPos, setStickPos] = useState({ x: 0, y: 0 });
  const MAX_RADIUS = 60; // Absolute movement bounds limit for the virtual analog stick

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      let touchX = gestureState.dx;
      let touchY = gestureState.dy;

      // Bound the touch coordinates inside a fixed circular radius limits matrix
      const distance = Math.hypot(touchX, touchY);
      if (distance > MAX_RADIUS) {
        const angle = Math.atan2(touchY, touchX);
        touchX = Math.cos(angle) * MAX_RADIUS;
        touchY = Math.sin(angle) * MAX_RADIUS;
      }

      setStickPos({ x: touchX, y: touchY });

      // Translate raw touch offsets into velocity vectors between -1.0 and 1.0
      const velocityVectorX = touchX / MAX_RADIUS;
      const velocityVectorZ = touchY / MAX_RADIUS; // Maps screen Y to 3D Z movement plane
      
      onMoveMatrixUpdate(velocityVectorX, velocityVectorZ);
    },
    onPanResponderRelease: () => {
      setStickPos({ x: 0, y: 0 });
      onMoveMatrixUpdate(0, 0); // Completely halt character mesh velocity on touch drop
    }
  });

  return (
    <View style={styles.joystickBase} {...panResponder.panHandlers}>
      <View style={[styles.joystickStick, { transform: [{ translateX: stickPos.x }, { translateY: stickPos.y }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  joystickBase: {
    position: 'absolute', bottom: 40, left: 40,
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center', alignItems: 'center', zIndex: 105
  },
  joystickStick: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: 'rgba(234, 179, 8, 0.7)', // Golden accent joystick stick
    borderWidth: 1, borderColor: '#fbbf24'
  }
});
