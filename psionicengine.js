import * as THREE from 'three';
import { ArchverseLogger } from './Logger';

export const ArchversePsionicEngine = {
  // 1. PSYCHOMETRY NODE: Read historical backend data from items on the map
  readItemHistory: (targetMeshItem) => {
    if (!targetMeshItem.metadata || !targetMeshItem.metadata.historicalChronology) {
      return "The matrix residue is completely silent.";
    }
    // Pulls ancient wisdom text fragments directly out of the item schema
    return `📜 [Psychometry Resonance]: "${targetMeshItem.metadata.historicalChronology}"`;
  },

  // 2. TELEKINESIS VECTOR CONTROLLER: Grab and move 3D geometry objects via mouse rays
  executeTelekinesis: (mouseCoords, camera, interactiveGroup, delta) => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouseCoords, camera);
    const intersects = raycaster.intersectObjects(interactiveGroup.children);

    if (intersects.length > 0) {
      const targetObj = intersects[0].object;
      
      // Pull object closer along the camera look vector line using lerp interpolation
      const targetPosition = new THREE.Vector3(0, 0, -4).applyMatrix4(camera.matrixWorld);
      targetObj.position.lerp(targetPosition, 0.1);
      
      ArchverseLogger.log('INFO', 'PSIONIC_ENGINE', `Executed telekinetic manipulation on object: ${targetObj.uuid}`);
      return targetObj;
    }
    return null;
  },

  // 3. TELEPATHICAL CHAT PROXIMITY HUB: Secure mental messaging bypassing public logs
  emitTelepathicMessage: (socket, recipientUsername, textString) => {
    if (!textString.trim()) return;

    // Encrypts and transmits private packets directly down target socket ID paths
    socket.emit('telepathic_packet', {
      targetUser: recipientUsername,
      message: textString.trim(),
      resonanceHz: 963 // Pure crown alignment frequency seal
    });
  }
};
