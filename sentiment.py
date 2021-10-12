import pickle
import warnings
import pandas as pd;
import sys
warnings.filterwarnings("ignore")
text =sys.argv[1];
pred=[0,0,0]   
try:
    with open("logistic_regression.p",'rb') as pickled:
        try:
            data=pickle.load(pickled)
            model=data['model']
            vectorizer=data['vectorizer']
            vector=vectorizer.transform([text])
            prediction=model.predict(vector)[0]
            pred[0]=prediction
        except:
            print("Oops!", sys.exc_info()[0], "occurred.")            
except:
      print("Oops!", sys.exc_info()[0], "occurred.")            

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