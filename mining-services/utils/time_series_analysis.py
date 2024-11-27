import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing


def perform_time_series_prediction(recommendations):
    # Validar que la entrada no esté vacía
    if not recommendations:
        return {
            'reales': 0,
            'predichos': 0
        }

    # Convertir a DataFrame
    df = pd.DataFrame(recommendations)

    # Filtrar solo recomendaciones validadas
    df = df[df['validada'] == 1]

    # Cambiar la agrupación a semanas
    df['fecha_validacion'] = pd.to_datetime(df['fecha_validacion']).dt.to_period('W')

    # Contar recomendaciones validadas por mes
    df_grouped = df.groupby('fecha_validacion').size().reset_index(name='total_recomendaciones')
    df_grouped['fecha_validacion'] = df_grouped['fecha_validacion'].dt.to_timestamp()

    # Manejar escenarios con pocos datos
    if len(df_grouped) < 2:
        return {
            'reales': int(df_grouped['total_recomendaciones'].sum()) if not df_grouped.empty else 0,
            'predichos': 0
        }

    try:
        # Preparar datos para el modelo
        data = df_grouped.set_index('fecha_validacion')['total_recomendaciones']

        # Modelo Holt-Winters
        model = ExponentialSmoothing(
            data,
            trend='add',
            seasonal='add',
            seasonal_periods=4
        ).fit()

        # Pronóstico para el siguiente mes
        forecast = model.forecast(steps=1)

        # Devolver resultados
        return {
            'reales': int(data.iloc[-1]),
            'predichos': int(max(0, forecast.iloc[0]))
        }

    except Exception as e:
        print(f"Error en predicción: {e}")
        return {
            'reales': int(data.iloc[-1]) if len(data) > 0 else 0,
            'predichos': 0
        }
