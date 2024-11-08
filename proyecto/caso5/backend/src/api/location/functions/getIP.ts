// getPublicIP.js o getPublicIP.ts
async function getPublicIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('Tu IP pública es:', data.ip);
        return data.ip;
    } catch (error) {
        console.error('Error al obtener la IP pública:', error);
    }
}

export default getPublicIP;
