from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return {
        "health": {"message": "Python service alive"}
    }

@app.get("/animals")
def get_animals():
    return {
        "data": {
            "animals": [
                {"name": "Mr. Buick", "species": "Cat"},
                {"name": "Leo", "species": "Lion"}
            ]
        },
        "meta": {},
        "links": {}
    }
