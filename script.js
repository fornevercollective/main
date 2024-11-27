// Web3 Initialization (MetaMask)
async function initWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Connected to Ethereum wallet");
    }
}

// WebRTC Connection Setup
const peerConnection = new RTCPeerConnection();
const dataChannel = peerConnection.createDataChannel("mesh-data");

// WebSocket Setup for Peer Discovery
const socket = new WebSocket('wss://your-websocket-server.com');
socket.onopen = function() {
    console.log('WebSocket connection established');
};

// 3D Mesh Visualization with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('mesh-3d').appendChild(renderer.domElement);

// Create sample mesh network nodes
function createNode(x, y, z) {
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    scene.add(sphere);
}

// Add sample nodes to represent mesh devices
createNode(1, 1, 0);
createNode(-2, -2, 0);
createNode(3, -1, 0);

// Set camera position and animate scene
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Example of fetching live IP address
async function fetchIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    document.getElementById("ip-address").innerText = data.ip;
}

// Example of fetching transfer speeds
function fetchTransferSpeeds() {
    document.getElementById("download-speed").innerText = "50 Mbps (Mocked)";
    document.getElementById("upload-speed").innerText = "25 Mbps (Mocked)";
}

// Example of fetching air quality
async function fetchAirQuality() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=35&lon=139&appid=YOUR_API_KEY');
    const data = await response.json();
    document.getElementById("air-quality").innerText = `AQI: ${data.list[0].main.aqi}`;
}

// Update system data and initialize Web3
window.onload = function() {
    fetchIP();
    fetchTransferSpeeds();
    fetchAirQuality();
    initWeb3();
};
