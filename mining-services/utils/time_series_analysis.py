import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing

def perform_time_series_prediction(recommendations):
    try:
        # Convertir las recomendaciones en un DataFrame
        df = pd.DataFrame(recommendations)
        if 'fecha_validacion' not in df or 'categoria' not in df:
            raise ValueError("Los objetos deben contener los campos 'fecha_validacion' y 'categoria'.")

        # Convertir la fecha a formato datetime
        df['fecha_validacion'] = pd.to_datetime(df['fecha_validacion'])

        # Agregar columna de conteo
        df['count'] = 1

        # Crear un índice temporal por categoría
        df_grouped = (
            df.groupby([pd.Grouper(key='fecha_validacion', freq='W'), 'categoria'])  # Agrupación semanal
            .count()
            .reset_index()
        )

        # Crear tabla pivote (filas: fecha, columnas: categoría, valores: conteo)
        pivot_table = (
            df_grouped.pivot(index='fecha_validacion', columns='categoria', values='count')
            .fillna(0)  # Rellenar valores faltantes con 0
        )

        # Predicciones por categoría
        predictions = {}
        reales = {}
        for categoria in pivot_table.columns:
            # Extraer los datos de la categoría
            data = pivot_table[categoria]

            # Si hay datos insuficientes, continuar
            if len(data) < 2:
                predictions[categoria] = "Datos insuficientes para realizar predicción"
                reales[categoria] = int(data.iloc[-1]) if not data.empty else 0
                continue

            # Ajustar el modelo Holt-Winters
            # Determinar si hay suficientes datos para el modelo estacional
            if len(data) < 8:  # Menos de 2 ciclos completos (seasonal_periods * 2)
                model = ExponentialSmoothing(data).fit()  # Sin componente estacional
            else:
                model = ExponentialSmoothing(
                    data,
                    seasonal="add",  # Componente estacional aditivo
                    seasonal_periods=4,  # Consideramos 4 periodos para datos semanales
                ).fit()

            # Generar predicción para el siguiente periodo
            forecast = model.forecast(steps=1)

            reales[categoria] = int(data.iloc[-1])  # Último valor real convertido a `int`
            predictions[categoria] = int(forecast.iloc[0])  # Predicción convertida a `int`

        # Retornar los resultados
        return {
            "reales": reales,
            "predichos": predictions,
        }

    except Exception as e:
        raise ValueError(f"Error durante el análisis de series de tiempo: {str(e)}")
