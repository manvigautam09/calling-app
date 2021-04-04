// Add video streams to the container.
export function addVideoStream(elementId, remoteContainer) {
  // Creates a new div for every stream
  let streamDiv = document.createElement('div');
  // Assigns the elementId to the div.
  streamDiv.id = elementId;
  // Takes care of the lateral inversion
  streamDiv.style.transform = 'rotateY(180deg)';
  // Adds the div to the container.
  remoteContainer.appendChild(streamDiv);
}

// Remove the video stream from the container.
export function removeVideoStream(elementId) {
  let remoteDiv = document.getElementById(elementId);
  if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
}
