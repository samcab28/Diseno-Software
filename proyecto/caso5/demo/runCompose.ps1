# Colores para mejorar la legibilidad
$GREEN = "`e[0;32m"
$BLUE = "`e[0;34m"
$NC = "`e[0m" # Sin color

# Función para imprimir mensajes con formato
function Print-Message {
    param (
        [string]$Message
    )
    Write-Host "$BLUE[Docker Script]$NC $GREEN$Message$NC"
}

# Función para verificar si un comando existe
function Check-Command {
    param (
        [string]$Command
    )
    if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) {
        Write-Host "Error: $Command no está instalado"
        exit 1
    }
}

# Verificar dependencias necesarias
Check-Command "docker"
Check-Command "docker-compose"

# Detener contenedores existentes y eliminar volúmenes
Print-Message "Deteniendo contenedores existentes y limpiando volúmenes..."
docker-compose down -v

# Limpiar node_modules local si existe
if (Test-Path "backend/node_modules") {
    Print-Message "Limpiando node_modules local..."
    Remove-Item -Recurse -Force "backend/node_modules"
}

# Construir las imágenes
Print-Message "Construyendo imágenes..."
docker-compose build

# Crear la red si no existe
if (-not (docker network inspect app-network -ErrorAction SilentlyContinue)) {
    docker network create app-network
}

# Instalar dependencias
Print-Message "Instalando dependencias..."
docker-compose run --rm backend npm install

# Levantar los servicios
Print-Message "Levantando servicios..."
docker-compose up -d

# Esperar a que el servidor esté disponible
Print-Message "Esperando a que el servidor esté disponible..."
$timeout = 30
$elapsed = 0
while (-not (Invoke-WebRequest -Uri http://localhost:8080 -UseBasicParsing -ErrorAction SilentlyContinue)) {
    Start-Sleep -Seconds 1
    $elapsed++
    if ($elapsed -gt $timeout) {
        Print-Message "Tiempo de espera agotado. Verificar logs con: docker-compose logs"
        exit 1
    }
}

# Esperar a que el servidor se despliegue de manera correcta
sleep 10
# Abrir el navegador en diferentes sistemas operativos
Print-Message "Abriendo navegador..."
switch ($env:OS) {
    "Windows_NT" { Start-Process "http://localhost:8080" }
    default { Print-Message "Por favor abre http://localhost:8080 en tu navegador" }
}

# Mostrar los logs
Print-Message "Mostrando logs..."
docker-compose logs -f