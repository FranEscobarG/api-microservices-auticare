import requests
import os
from dotenv import load_dotenv
from google.oauth2 import service_account
from google.auth.transport.requests import Request
import json

# Cargar variables de entorno
load_dotenv()

# Configuración
CREDENTIALS_PATH = os.getenv("CREDENTIALS_PATH", "mimetic-union-388617-bcf738680a68.json")
SCOPES = ["https://www.googleapis.com/auth/generative-language"]
API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'


def get_access_token():
    """Obtiene el token de acceso utilizando la cuenta de servicio."""
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH, scopes=SCOPES)
    credentials.refresh(Request())
    return credentials.token


def is_opinion(text):
    """
    Verifica si el texto contiene una opinión.
    Returns:
        bool: True si es una opinión, False si no lo es.
    """
    token = get_access_token()
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    # Prompt para verificar si es una opinión
    prompt = (
        f"Analiza el siguiente texto y responde únicamente con True o False en formato JSON.\n"
        f"Texto: \"{text}\"\n"
        f"¿El texto expresa una opinión personal sobre algo o alguien? Una opinión personal es un juicio o valoración subjetiva. Por ejemplo:\n"
        f"- 'Esta película es excelente' (opinión positiva)\n"
        f"- 'La comida estaba horrible' (opinión negativa)\n"
        f"- 'Aun no estoy seguro si esta recomendación me fue útil' (opinión neutral)\n"
        f"**Excluye:** hechos, preguntas simples, saludos y expresiones generales.\n"
        f"**Considera:** el contexto cultural hispano. Identifica si el texto expresa una opinión clara y definida sobre algo o alguien, descartando expresiones idiomáticas o frases hechas que no reflejen un juicio de valor. Por ejemplo, en español, la expresión 'Hola mundo, maldito' es un saludo y no una opinión. \n"
        f"Responde:\n"
        f"{{'es_opinion': true}} si es una opinión.\n"
        f"{{'es_opinion': false}} si no lo es."
    )

    payload = {
        "contents": [
            {"parts": [{"text": prompt}]}
        ]
    }

    response = requests.post(API_ENDPOINT, headers=headers, json=payload)

    if response.status_code == 200:
        try:
            data = response.json()
            result = data["candidates"][0]["content"]["parts"][0]["text"].strip()
            if result.startswith("```json") and result.endswith("```"):
                result = result[7:-3].strip()  # Elimina ```json y ```

            result_json = json.loads(result)
            return result_json.get('es_opinion', False)
        except (KeyError, IndexError, TypeError, json.JSONDecodeError):
            return False
    else:
        return False


def analyze_sentiment_with_gemini(text):
    # Primero verificamos si es una opinión
    if not is_opinion(text):
        return None

    # Obtener token de acceso
    token = get_access_token()
    # Encabezados de la solicitud
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    # Instrucciones precisas para el modelo
    prompt = "Análiza el siguiente texto:\n"
    prompt += text
    prompt += (
        "Realiza un análisis exhaustivo de la subjetividad del texto, identificando la opinión personal expresada y su polaridad. Considera:\n"
        "- **Contexto:** El significado general del texto, considerando el contexto cultural hispano, incluyendo ironía, sarcasmo y otros matices lingüísticos, descartando expresiones idiomáticas o frases hechas que no reflejen un juicio de valor.\n"
        "- **Intensidad:** La fuerza del sentimiento expresado (e.g., muy positivo, ligeramente negativo).\n"
        "- **Subjetividad vs. Objetividad:** Distingue entre hechos y opiniones, enfocándote en la evaluación personal.\n\n"
        "Si no identificas una opinión clara y definida sobre algo o alguien, devuelve un resultado en formato JSON con la estructura: {{'polaridad': null}}.\n"
        "Clasifica la polaridad del texto en una escala del 1 al 5, donde:\n"
        "1 = Muy Negativo, 2 = Negativo, 3 = Neutro, 4 = Positivo, 5 = Muy Positivo.\n\n"
        "Devuelve un resultado en formato JSON con la estructura: {{'polaridad': valor}}.\n"
        "No incluyas explicaciones adicionales ni formato diferente al solicitado."
    )

    # Cuerpo de la solicitud
    payload = {
        "contents": [
            {"parts": [{"text": prompt}]}
        ]
    }

    # Enviar solicitud
    response = requests.post(API_ENDPOINT, headers=headers, json=payload)

    if response.status_code == 200:
        try:
            # Procesar respuesta de la API
            data = response.json()
            result = data["candidates"][0]["content"]["parts"][0]["text"].strip()
            if result:
                # Limpiar bloques ```json\n...\n``` si existen
                if result.startswith("```json") and result.endswith("```"):
                    result = result[7:-3].strip()  # Elimina ```json y ```

                # Convertir a diccionario para validación
                result_json = json.loads(result)

                # Retornar solo el valor de la polaridad
                return result_json.get('polaridad', None)
            else:
                return "La respuesta de la API no contiene el formato esperado."
        except (KeyError, IndexError, TypeError):
            return "Error al procesar la respuesta del análisis de sentimientos."
    else:
        return f"Error {response.status_code}: {response.text}"

