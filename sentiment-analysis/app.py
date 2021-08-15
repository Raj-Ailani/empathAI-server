from flask import Flask
from flask import request
import json
import pickle
import joblib
from sklearn.feature_extraction.text import CountVectorizer

app = Flask(__name__)

@app.route('/')
def server():
    
    return ('Inside Flask server')


@app.route('/sentiment', methods=['POST'])
def hello_world():
    data = request.data
    # body = json.loads(data)
    # data = str(json.dumps(data))
    # body = json.loads(data)
    feature_path = 'models/feature.pkl'
    loaded_vect = CountVectorizer(
        decode_error="replace", vocabulary=pickle.load(open(feature_path, "rb")))
    lg_model = joblib.load(
        'models/model.sav')
    text = data
    input = []
    input.append(text)
    input = loaded_vect.transform(input).toarray()
    prediction = lg_model.predict(input)
    output = str(prediction[0])
    return (output)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
