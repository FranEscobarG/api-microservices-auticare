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


def analyze_sentiment_with_gemini(text):
    """
    Envía un texto a la API de Gemini para análisis de sentimientos.

    Args:
        text (str): El texto a analizar.

    Returns:
        dict: Un JSON con la polaridad en una escala de 1 a 5.
        str: Un mensaje si el texto no contiene una opinión válida.
    """
    # Obtener token de acceso
    token = get_access_token()

    # Encabezados de la solicitud
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    # Instrucciones precisas para el modelo
    prompt = text
    prompt += (
        "Realiza un análisis completo de los sentimientos del texto proporcionado, considerando los siguientes pasos:\n"
        "1. **Tokenización:** Divide el texto en palabras o frases significativas para un análisis detallado.\n"
        "2. **Lematización:** Identifica la forma base de las palabras para asegurar que las variaciones gramaticales no afecten el análisis.\n"
        "3. **Análisis de Entidades Nombradas:** Detecta nombres propios, ubicaciones, productos u otras entidades relevantes para comprender mejor el contexto.\n"
        "4. **Detección de Contrastes:** Reconoce si el texto contiene opiniones mixtas (por ejemplo, algo positivo seguido de algo negativo) y evalúa cuál es el sentimiento predominante.\n"
        "5. **Contexto General:** Determina hacia dónde apunta el texto en términos de sentimiento, evaluando la coherencia y el peso de cada afirmación.\n\n"
        "Clasifica la polaridad del texto en una escala del 1 al 5, donde:\n"
        "1 = Muy Negativo, 2 = Negativo, 3 = Neutro, 4 = Positivo, 5 = Muy Positivo.\n\n"
        "Devuelve un resultado en formato JSON con la estructura: {{'polaridad': valor}}.\n"
        "Si el texto no contiene una opinión válida o clara, responde únicamente con: 'Proporciona una opinión válida'.\n"
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
            return "Error al procesar la respuesta de la API."
    else:
        return f"Error {response.status_code}: {response.text}"

