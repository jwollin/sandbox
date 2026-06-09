from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return {
        "health": {"message": "Python service alive"}
    }


@app.get("/animals")
def get_animals():
    return [
        {"name": "Mr. Buick", "species": "Cat"},
        {"name": "Leo", "species": "Lion"}
    ]
