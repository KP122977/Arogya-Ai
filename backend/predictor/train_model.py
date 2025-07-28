import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.metrics import accuracy_score
import joblib
import os

# Load dataset
data = pd.read_csv("predictor/Symtomps_Disease_dataset.csv")  # Make sure this file has correct column names

# Separate features and target
X = data.drop("disease", axis=1)
y = data["disease"]

# Encode target labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# One-hot encode the symptoms (optional in your case, symptoms are binary already)
# So we skip OneHotEncoder — symptoms are already binary 0/1

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42
)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model Accuracy: {accuracy * 100:.2f}%")

# Create 'model' directory if it doesn't exist
os.makedirs("model", exist_ok=True)

# Save model and encoders and feature names
joblib.dump({
    "model": model,
    "label_encoder": label_encoder,
    "feature_names": X.columns.tolist()
}, "model/disease_model.pkl")

print("✅ Model and metadata saved to model/disease_model.pkl")

