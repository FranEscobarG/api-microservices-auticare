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

        # Devolver JSON con la polaridad
        return jsonify({'polaridad': polaridad})

    except Exception as e:
        return jsonify({'error': f'Error interno del servidor: {str(e)}'}), 500



# Endpoint para predicciones de series de tiempo
@app.route('/predict-recommendations', methods=['POST'])
def predict_recommendations():
    try:
        data = request.get_json()
        if not data or not isinstance(data, list):
            return jsonify({'error': 'Datos no válidos. Proporcione un array de objetos.'}), 400

        # Procesar las recomendaciones
        prediction_result = perform_time_series_prediction(data)
        return jsonify(prediction_result)

    except Exception as e:
        return jsonify({'error': f'Error interno del servidor: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(port=3005, debug=True)
