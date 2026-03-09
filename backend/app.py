from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error
from tensorflow.keras.models import load_model
import joblib
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

df = pd.read_csv("data/DailyBeijingClimatecopy.csv")
df["date"] = pd.to_datetime(df["date"], format="mixed", errors="coerce")
df = df.dropna(subset=["date"])

model = load_model("models/lstm_power_model.keras")
scalers = joblib.load("models/scalers.pkl")

@app.route("/dashboard-data")
def dashboard_data():


    power_trend = [
        {"date": str(row["date"].date()), "power": float(row["power"])}
        for _, row in df.iterrows()
    ]


    temp_power = [
        {"temp": float(row["temperature"]), "power": float(row["power"])}
        for _, row in df.iterrows()
    ]

    humidity_power = [
        {"humidity": float(row["humidity"]), "power": float(row["power"])}
        for _, row in df.iterrows()
    ]

    wind_power = [
        {"wind": float(row["wind_speed"]), "power": float(row["power"])}
        for _, row in df.iterrows()
    ]

    corr = df[["temperature","humidity","wind_speed","power"]].corr()

    correlation = [
        {
            "feature": "Temperature",
            "temp": float(corr.loc["temperature","temperature"]),
            "humidity": float(corr.loc["temperature","humidity"]),
            "wind": float(corr.loc["temperature","wind_speed"]),
            "power": float(corr.loc["temperature","power"])
        },
        {
            "feature": "Humidity",
            "temp": float(corr.loc["humidity","temperature"]),
            "humidity": float(corr.loc["humidity","humidity"]),
            "wind": float(corr.loc["humidity","wind_speed"]),
            "power": float(corr.loc["humidity","power"])
        },
        {
            "feature": "Wind",
            "temp": float(corr.loc["wind_speed","temperature"]),
            "humidity": float(corr.loc["wind_speed","humidity"]),
            "wind": float(corr.loc["wind_speed","wind_speed"]),
            "power": float(corr.loc["wind_speed","power"])
        },
        {
            "feature": "Power",
            "temp": float(corr.loc["power","temperature"]),
            "humidity": float(corr.loc["power","humidity"]),
            "wind": float(corr.loc["power","wind_speed"]),
            "power": float(corr.loc["power","power"])
        }
    ]

    with open("data/dashboard_data.json", "r") as f:
        prediction_data = json.load(f)

    actual_vs_predicted = prediction_data["actualVsPredicted"]
    error_distribution = prediction_data["errorDistribution"]

    return jsonify({
        "powerTrend": power_trend,
        "tempPower": temp_power,
        "humidityPower": humidity_power,
        "windPower": wind_power,
        "correlation": correlation,
        "actualVsPredicted": actual_vs_predicted,
        "errorDistribution": error_distribution
    })

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    temperature = float(data["temperature"])
    humidity = float(data["humidity"])
    wind_speed = float(data["wind"])

    temp_scaled = scalers["scaler_temperature"].transform([[temperature]])[0][0]
    humidity_scaled = scalers["scaler_humidity"].transform([[humidity]])[0][0]
    wind_scaled = scalers["scaler_wind_speed"].transform([[wind_speed]])[0][0]

    n_past = 10
    input_sequence = []

    for _ in range(n_past):
        input_sequence.append([temp_scaled, humidity_scaled, wind_scaled, 0])

    input_sequence = np.array(input_sequence)
    input_sequence = input_sequence.reshape(1, n_past, 4)

    prediction = model.predict(input_sequence)

    power_index = 3
    power_predictions_scaled = prediction[0, :, power_index]

    power_predictions = scalers["scaler_power"].inverse_transform(
        power_predictions_scaled.reshape(-1, 1)
    ).flatten()

    current_prediction = float(power_predictions[0])

    future_predictions = []

    for i, value in enumerate(power_predictions):
        future_predictions.append({
            "hour": i + 1,
            "power": float(value)
        })

    return jsonify({
        "prediction": current_prediction,
        "futurePredictions": future_predictions
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)