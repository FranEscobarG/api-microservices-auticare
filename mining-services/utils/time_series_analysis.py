import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing

def perform_time_series_prediction(recommendations):
    # Convertir recomendaciones en DataFrame
    df = pd.DataFrame(recommendations)
    df['fecha_validacion'] = pd.to_datetime(df['fecha_validacion'])
    df['count'] = 1

    # Agrupar por categoría y periodo (mensual)
    df_grouped = df.groupby([pd.Grouper(key='fecha_validacion', freq='M'), 'categoria']).count().reset_index()
    pivot_table = df_grouped.pivot(index='fecha_validacion', columns='categoria', values='count').fillna(0)

    # Realizar predicción por categoría
    predictions = {}
    reales = {}
    for categoria in pivot_table.columns:
        data = pivot_table[categoria]
        model = ExponentialSmoothing(data, seasonal='add', seasonal_periods=12).fit()
        forecast = model.forecast(steps=1)  # Predicción para el próximo periodo

        reales[categoria] = data.iloc[-1]  # Último valor real
        predictions[categoria] = int(forecast.iloc[0])  # Predicción

    return {
        'reales': reales,
        'predichos': predictions
    }
