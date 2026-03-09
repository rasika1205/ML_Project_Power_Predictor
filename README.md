
---

# ML Project — Power Predictor (LSTM + Enhanced Dung Beetle Optimization)

A full-stack machine learning project that predicts **power output** from **weather conditions** (temperature, humidity, wind speed) using an **LSTM deep learning model**. The model’s hyperparameters were tuned using an **Enhanced Dung Beetle Optimization (EDBO)** technique to improve predictive performance and training stability.

The backend exposes REST APIs for:
- **Predictions** based on user-provided inputs
- **Dashboard analytics data** (trend charts, correlation matrix, error distribution, actual vs predicted)

---

## Table of Contents
- [Key Highlights](#key-highlights)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Machine Learning Approach](#machine-learning-approach)
  - [LSTM Model](#lstm-model)
  - [Hyperparameter Optimization: Enhanced Dung Beetle Optimization (EDBO)](#hyperparameter-optimization-enhanced-dung-beetle-optimization-edbo)
- [API Overview](#api-overview)
  - [`GET /dashboard-data`](#get-dashboard-data)
  - [`POST /predict`](#post-predict)
- [Setup & Installation](#setup--installation)
- [Running the Backend](#running-the-backend)
- [Configuration Notes](#configuration-notes)
- [Model & Data Artifacts](#model--data-artifacts)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Key Highlights
- **LSTM-based power prediction** from weather features
- **Enhanced Dung Beetle Optimization (EDBO)** used to search for the best LSTM hyperparameters
- Flask backend with:
  - `/predict` for real-time predictions
  - `/dashboard-data` for analytics-ready datasets
- Saved artifacts:
  - Trained model (`.keras`)
  - Pre-fitted scalers (`.pkl`)
- CORS enabled for smooth frontend-backend integration

---
## Demo
<img width="1352" height="514" alt="Screenshot 2026-03-09 141045" src="https://github.com/user-attachments/assets/ca9bc248-ec86-45da-8dea-14649fd821ee" />
<img width="1695" height="901" alt="Screenshot 2026-03-09 141108" src="https://github.com/user-attachments/assets/cfaffaf7-bc50-475f-9843-c8f7963a9c6e" />
<img width="1688" height="909" alt="Screenshot 2026-03-09 141127" src="https://github.com/user-attachments/assets/06f22f1c-5195-4407-9ebc-628f0bf5afd5" />
<img width="1547" height="782" alt="Screenshot 2026-03-09 141205" src="https://github.com/user-attachments/assets/f8031cf0-916a-4923-a8fd-8c311a429a4d" />


## Tech Stack

**Backend**
- Python, Flask
- `flask-cors`

**Data & ML**
- pandas, numpy
- TensorFlow / Keras (LSTM)
- scikit-learn (preprocessing + evaluation)
- joblib (artifact persistence)

---

## Project Structure

```text
ML_Project_Power_Predictor/
├─ backend/
│  └─ app.py
├─ data/
│  ├─ DailyBeijingClimatecopy.csv
│  └─ dashboard_data.json
├─ models/
│  ├─ lstm_power_model.keras
│  └─ scalers.pkl
└─ README.md
```

---

## Machine Learning Approach

### LSTM Model
This project uses an LSTM model to learn the relationship between weather conditions and power generation/output. LSTMs are effective for sequence learning and time-dependent patterns, making them suitable when the target variable is influenced by temporal dynamics.

**Inputs used in the backend prediction API:**
- Temperature
- Humidity
- Wind speed

**Preprocessing:**
- Inputs are scaled using saved scalers (`models/scalers.pkl`)
- Power is inverse-transformed back to the original scale for interpretability

---

### Hyperparameter Optimization: Enhanced Dung Beetle Optimization (EDBO)

To obtain the best-performing LSTM configuration, this project uses an **Enhanced Dung Beetle Optimization (EDBO)** technique for hyperparameter tuning.

**Why EDBO?**
Traditional tuning methods (manual search, simple grid search) can be slow and may miss strong configurations. EDBO is a metaheuristic optimization approach designed to efficiently explore large search spaces and find near-optimal solutions with fewer evaluations.

**What EDBO optimized (examples):**
Depending on your experiment design, EDBO can tune:
- Number of LSTM units / hidden neurons
- Number of LSTM layers
- Dropout / recurrent dropout
- Learning rate
- Batch size

**Optimization objective:**
EDBO evaluates candidate hyperparameter sets by training the model (or a training subset) and minimizing an objective metric such as:
- Validation RMSE

**Outcome:**
The final saved model (`models/lstm_power_model.keras`) reflects the best hyperparameter configuration found by EDBO and is used by the Flask backend for inference.


---

## API Overview

Base URL (local): `http://localhost:5000`

### `GET /dashboard-data`

Returns analytics-ready data for dashboards and plots.

**Response (JSON)**
```json
{
  "powerTrend": [{"date": "YYYY-MM-DD", "power": 123.45}],
  "tempPower": [{"temp": 12.3, "power": 123.45}],
  "humidityPower": [{"humidity": 45.6, "power": 123.45}],
  "windPower": [{"wind": 3.4, "power": 123.45}],
  "correlation": [
    {
      "feature": "Temperature",
      "temp": 1.0,
      "humidity": 0.12,
      "wind": -0.05,
      "power": 0.34
    }
  ],
  "actualVsPredicted": [],
  "errorDistribution": []
}
```

---

### `POST /predict`

Generates power predictions from user input.

**Request (JSON)**
```json
{
  "temperature": 25.0,
  "humidity": 60.0,
  "wind": 4.5
}
```

**Response (JSON)**
```json
{
  "prediction": 123.45,
  "futurePredictions": [
    { "hour": 1, "power": 123.45 },
    { "hour": 2, "power": 120.12 }
  ]
}
```

**Implementation notes (current backend logic):**
- Scales input features using stored scalers
- Builds a lookback window `n_past = 10` by repeating the same scaled input
- Performs model inference
- Inverse-transforms the predicted power back to original units

---

## Setup & Installation

### Prerequisites
- Python 3.9+ recommended
- `pip` and a virtual environment tool (`venv` or conda)
- Required files:
  - `data/DailyBeijingClimatecopy.csv`
  - `data/dashboard_data.json`
  - `models/lstm_power_model.keras`
  - `models/scalers.pkl`

### Create and activate a virtual environment

```bash
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate
```

### Install dependencies

If your project has `requirements.txt`:
```bash
pip install -r requirements.txt
```

Otherwise install core requirements:
```bash
pip install flask flask-cors pandas numpy scikit-learn tensorflow joblib
```

---

## Running the Backend

From the repository root:

```bash
python backend/app.py
```

Server:
- `http://localhost:5000`

---

## Configuration Notes

The backend uses relative paths:
- `data/DailyBeijingClimatecopy.csv`
- `data/dashboard_data.json`
- `models/lstm_power_model.keras`
- `models/scalers.pkl`

Run the backend from the **project root** to avoid path issues.

---

## Model & Data Artifacts

### Dataset (`data/DailyBeijingClimatecopy.csv`)
Expected columns used by the backend:
- `date`
- `temperature`
- `humidity`
- `wind_speed`
- `power`

Dates are parsed with:
- `pd.to_datetime(..., format="mixed", errors="coerce")`
and rows with invalid dates are dropped.

### Scalers (`models/scalers.pkl`)
Required keys:
- `scaler_temperature`
- `scaler_humidity`
- `scaler_wind_speed`
- `scaler_power`

### Model (`models/lstm_power_model.keras`)
Loaded once at app start. The `/predict` logic assumes the model output includes a power value at index `3` (`power_index = 3`) as currently implemented.

---



## Future Improvements
- Add a pinned `requirements.txt`
- Add a training notebook/script documenting:
  - EDBO search space
  - best hyperparameters found
  - training/validation metrics and plots
- Improve multi-step forecasting by generating true autoregressive future steps (rather than repeating identical inputs)
- Add tests for API endpoints

---

## Author

Rasika Gautam 2024UCM2694
Pulkit Gupta 2024UCM4018
Akshat Jain 2024UCM3327

---

