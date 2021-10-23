import pickle
import warnings
import pandas as pd;
warnings.filterwarnings("ignore")
   
with open("logistic_regression.p",'rb') as pickled:
    data=pickle.load(pickled)
    model=data['model']
    vectorizer=data['vectorizer']
    df=pd.read_csv("amazon_review.csv")
    # print(df.head())
    pred=[]
    count=[0,0]
    for i in df.index:
        vector=vectorizer.transform([df['review_stopwords'][i]])
        prediction=model.predict(vector)[0]
        pred.append(prediction)
        count[prediction]+=1
    print(count)
    df["logistic_sentiment"]=pred   
    df.to_csv("amazon_review.csv")    