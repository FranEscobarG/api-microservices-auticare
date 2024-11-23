from flask import Flask, request, jsonify
from utils.sentiment_analysis import analyze_sentiment_with_gemini
from utils.time_series_analysis import perform_time_series_prediction
import requests

app = Flask(__name__)

# Endpoint para análisis de sentimientos
@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment_endpoint():
    try:
        # Validar entrada
        data = request.get_json()
        if not data or 'comentario' not in data:
            return jsonify({'error': 'Texto no proporcionado. Por favor incluye el campo "comentario".'}), 400

        # Procesar comentario
        text = data['comentario'].strip()
        polaridad = analyze_sentiment_with_gemini(text)
        print(polaridad)

        # Validar respuesta de la API
        # if not polaridad:
        #     return jsonify({'error': 'La respuesta de la API no contiene información válida.'}), 500

        # if "Proporciona una opinión válida" in polaridad:
        #     return jsonify({'error': 'Proporciona una opinión válida.'}), 400

        # Devolver JSON con la polaridad
        return jsonify({'polaridad': polaridad})

    except Exception as e:
        return jsonify({'error': f'Error interno del servidor: {str(e)}'}), 500



# Endpoint para análisis predictivo
@app.route('/predict-recommendations', methods=['GET'])
def predict_recommendations():
    # Obtén datos de tu servicio de recomendaciones
    response = requests.get('http://localhost:3000/api/v1/recommendations/not-validated')  # Cambia por tu endpoint real
    if response.status_code != 200:
        return jsonify({'error': 'No se pudieron obtener las recomendaciones.'}), 500

    recommendations = response.json()
    prediction_result = perform_time_series_prediction(recommendations)

    return jsonify(prediction_result)


if __name__ == '__main__':
    app.run(port=3005, debug=True)
