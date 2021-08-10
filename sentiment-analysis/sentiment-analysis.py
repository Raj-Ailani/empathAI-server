import pickle
import joblib
from sklearn.feature_extraction.text import CountVectorizer 


feature_path = '/home/ubuntu/empathAI-server/sentiment-analysis/models/feature.pkl'
loaded_vect =CountVectorizer(decode_error="replace", vocabulary=pickle.load(open(feature_path, "rb")))
lg_model = joblib.load('/home/ubuntu/empathAI-server/sentiment-analysis/models/model.sav')

text = 'Dont buy this product it is complete wate of money'
input=[]
input.append(text)

input = loaded_vect.transform(input).toarray()

prediction = lg_model.predict(input)
print(prediction)