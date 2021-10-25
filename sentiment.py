import pickle
import warnings
import pandas as pd;
import sys;
import nltk;
warnings.filterwarnings("ignore")
from nltk.corpus import stopwords
text =sys.argv[1];
# text="worst tech support"
nltk.download('stopwords') 
nltk.download('punkt')
from nltk.tokenize import word_tokenize 
text_tokens = word_tokenize(text) 
text_stopwords = [word for word in text_tokens if not word in stopwords.words()] 
text=' '.join(text_stopwords)
# print(text)
# text="good"
pred=[0,0,0]   
with open("logistic_regression.p",'rb') as pickled:
    data=pickle.load(pickled)
    model=data['model']
    vectorizer=data['vectorizer']
    vector=vectorizer.transform([text])
    prediction=model.predict(vector)[0]
    pred[0]=prediction

with open("random_forest.p",'rb') as pickled:
    data=pickle.load(pickled)
    model=data['model']
    vectorizer=data['vectorizer']
    vector=vectorizer.transform([text])
    prediction=model.predict(vector)[0]
    pred[1]=prediction

with open("support_vector_machine.p",'rb') as pickled:
    data=pickle.load(pickled)
    model=data['model']
    vectorizer=data['vectorizer']
    vector=vectorizer.transform([text])
    prediction=model.predict(vector)[0]
    pred[2]=prediction

print(pred)    