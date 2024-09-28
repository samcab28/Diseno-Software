import json
import psycopg2
from datetime import datetime
from psycopg2.extras import execute_batch
import logging

# Configurar logging
logging.basicConfig(filename='insert_games_log.txt', level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

# Configuración de la conexión a la base de datos
conn_string = "host='localhost' port='30100' dbname='games' user='postgres' password='CLtj6P4W3a'"

# Función para convertir la fecha de string a formato de fecha de PostgreSQL
def parse_date(date_string):
    try:
        return datetime.strptime(date_string, "%b %d, %Y").strftime("%Y-%m-%d")
    except ValueError:
        return None

try:
    # Conectar a la base de datos
    conn = psycopg2.connect(conn_string)
    cur = conn.cursor()
    logging.info("Conexión a la base de datos establecida con éxito.")

    # Abrir y leer el archivo JSON con codificación UTF-8
    with open('cleaned_games.json', 'r', encoding='utf-8') as file:
        games_data = json.load(file)
    logging.info(f"Archivo JSON leído con éxito. Total de juegos: {len(games_data)}")

    # Preparar los datos para la inserción por lotes
    data_to_insert = []
    for game_id, game_info in games_data.items():
        name = game_info['name']
        release_date = parse_date(game_info['release_date'])
        required_age = game_info['required_age']
        price = game_info['price']
        data_to_insert.append((name, release_date, required_age, price))
        
        # Log cada 1000 juegos procesados
        if len(data_to_insert) % 1000 == 0:
            logging.info(f"Procesados {len(data_to_insert)} juegos...")

    logging.info(f"Datos preparados para inserción. Total de registros: {len(data_to_insert)}")

    # Preparar la consulta SQL
    sql = """
    INSERT INTO games_info (name, release_date, required_age, price)
    VALUES (%s, %s, %s, %s)
    """

    # Ejecutar la inserción por lotes
    execute_batch(cur, sql, data_to_insert, page_size=1000)
    logging.info("Inserción por lotes completada.")

    # Confirmar los cambios
    conn.commit()
    logging.info("Cambios confirmados en la base de datos.")

    print(f"Se insertaron {len(data_to_insert)} registros correctamente.")
    logging.info(f"Se insertaron {len(data_to_insert)} registros correctamente.")

except (Exception, psycopg2.Error) as error:
    print(f"Error al insertar datos: {error}")
    logging.error(f"Error al insertar datos: {error}", exc_info=True)

finally:
    # Cerrar la conexión
    if conn:
        cur.close()
        conn.close()
        print("Conexión a la base de datos cerrada.")
        logging.info("Conexión a la base de datos cerrada.")