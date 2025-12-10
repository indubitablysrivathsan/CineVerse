from fastapi import FastAPI

app = FastAPI(title="CineVerse NLP Service")

@app.get("/health")
def health():
    return {"status": "ok", "service": "nlp-service", "model_loaded": False}
