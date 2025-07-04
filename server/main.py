from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from ultralytics import YOLO
from PIL import Image
import io
import os

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)

# Load models (adjust paths to your .keras models in server/models/)
human_model = load_model("C:/Users/xinex/OneDrive/Desktop/Clean them later/Some Models/xception_finetuned.keras")
non_human_model = load_model("C:/Users/xinex/OneDrive/Desktop/Clean them later/Final Runs/Various/Xception")
video_model = load_model("models/Video With Xception & LSTM.keras")
yolo_model = YOLO("models/yolov8n.pt")  # Pre-trained YOLOv8 model

# Supported file extensions
ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}
ALLOWED_VIDEO_EXTENSIONS = {".mp4"}

def preprocess_image(image: Image.Image, target_size: tuple):
        """Resize and preprocess image for model input."""
        image = image.resize(target_size)
        image_array = np.array(image) / 255.0  # Normalize to [0, 1]
        return np.expand_dims(image_array, axis=0)

def preprocess_video(video_path: str, target_size: tuple, num_frames: int = 10):
        """Extract and preprocess video frames."""
        cap = cv2.VideoCapture(video_path)
        frames = []
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        step = max(1, total_frames // num_frames)

        for i in range(0, total_frames, step):
            cap.set(cv2.CAP_PROP_POS_FRAMES, i)
            ret, frame = cap.read()
            if ret and len(frames) < num_frames:
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frame = cv2.resize(frame, target_size)
                frame = frame / 255.0  # Normalize
                frames.append(frame)

        cap.release()
        while len(frames) < num_frames:
            frames.append(np.zeros((target_size[0], target_size[1], 3)))  # Pad with zeros
        return np.expand_dims(np.array(frames), axis=0)

@app.get("/")
async def read_root():
    return {"message": "FastAPI Server is running"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Validate file extension
    if not file.filename:
        raise HTTPException(status_code=400, detail="File must have a filename")
    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in ALLOWED_IMAGE_EXTENSIONS | ALLOWED_VIDEO_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # Read file content
    content = await file.read()
        
    if file_extension in ALLOWED_IMAGE_EXTENSIONS:
        # Process image
        image = Image.open(io.BytesIO(content)).convert("RGB")
        
        # Run YOLO to detect humans
        yolo_results = yolo_model(image)
        has_human = any(cls in [0] for cls in yolo_results[0].boxes.cls)  # Class 0 is human in YOLO

        # Select model and preprocess
        if has_human:
            model = human_model
            target_size = (224, 224)
        else:
            model = non_human_model
            target_size = (299, 299)
        
        input_data = preprocess_image(image, target_size)
        
    else:  # Video
        # Save video temporarily
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as f:
            f.write(content)
        
        # Preprocess video
        model = video_model
        input_data = preprocess_video(temp_path, (128, 128), num_frames=10)
        os.remove(temp_path)  # Clean up

    # Make prediction
    prediction = model.predict(input_data)
    result = float(prediction[0][0])  # Assuming binary classification (sigmoid output)
    label = "Real" if result > 0.5 else "Fake"

    return {"filename": file.filename, "label": label, "confidence": result}