import json

class Session():

    def __init__(self, time, day, theater_name, movie_name, categories):
        self.time = time
        self.day = day
        self.theater = theater_name
        self.movie = movie_name
        self.categories = categories

    def __str__():
        return (f"{self.movie}: {self.day}-{self.time} @{self.theater}")


    def to_json(self):
        return json.dumps(
            self.to_dict(),
            ensure_ascii = False
        )

    def to_dict(self):
        return {
                'cinema': self.theater,
                'movie': self.movie,
                'date': self.day,
                'time': self.time,
                'categories': self.categories
        }