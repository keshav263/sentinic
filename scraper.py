# import modules
import requests
from bs4 import BeautifulSoup
import datetime
import pandas as pd
import sys
import re
import string
import nltk
import spacy
from nltk.corpus import stopwords
#list declaration
cus_res1=[]
cus_res2=[]
cus_res3=[]
cus_res4=[]
cus_res5=[]
cus_res6=[]

#function to parse the required data from each review page
def cus_reviews(soup):
  review = soup.find("div",class_="a-section a-spacing-none reviews-content a-size-base")

  for element in review.find_all("div",{'data-hook':"review"}): 

    item = element.find("span", class_="a-profile-name") #name
    try:
      cus_res1.append(item.get_text())
    except:
      cus_res1.append('xxx')
    
    item = element.find("span", {'data-hook':"review-date"}) #date
    try:
      s=item.get_text()
      x=s.find(" on ")
      s=s[x+4:]
      date=datetime.datetime.strptime(s,"%d %B %Y").strftime("%Y-%m-%d")
    except:
      date=datetime.datetime(2018, 9, 15)
    cus_res2.append(date)

    item = element.find("a", {'data-hook':"review-title"}) #title
    try:
      cus_res3.append(item.get_text().replace("\n",""))
    except:
      cus_res3.append('xxx')

    item = element.find("span",{'data-hook':"review-body"}) #review
    try:
      s1=item.get_text()
      s1= s1.replace("\xa0","").replace("\n\n","").lstrip()
    except:
      s1='xxx'    
    cus_res4.append(s1)

    flag=0
    for item in element.find_all("span", {'data-hook':"helpful-vote-statement"}): #vote
        flag=1
        try:
          s=item.get_text()
          if s[0]=="O":
            s=1
          else:
            x=s.find("p")
            s=int(s[:x-1].replace(",",""))        
          cus_res5.append(s)
        except:
          flag=0
    if flag==0:
      cus_res5.append(0)
    
    item = element.find("i", {'data-hook':"review-star-rating"}) #rating
    try:
      cus_res6.append(int(item.get_text()[0]))
    except:
      cus_res6.append(1)
 
HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
            AppleWebKit/537.36 (KHTML, like Gecko) \
            Chrome/90.0.4430.212 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'}) 

#make request to website
def getdata(url): 
    r = requests.get(url, headers=HEADERS)
    return r.text 

#html code scraped into beautiful soup object
def html_code(url):
    htmldata = getdata(url)
    soup = BeautifulSoup(htmldata, 'html.parser')
    return (soup) 

#url formatting
ticker="&pageNumber=" 
url = sys.argv[1];
# url="https://www.amazon.in/Mediabridge-FLEX-Ethernet-Category-Certified/product-reviews/B004LTE5JI/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews"
url += ticker

for i in range(1,51):
  url1= "{}{}".format(url,i)
  soup = html_code(url1)
  cus_reviews(soup)

# initialise the data dictionary
data = {'name': cus_res1,'date':cus_res2,'title':cus_res3,'review': cus_res4,'vote':cus_res5,'rating':cus_res6}

# Create DataFrame
df = pd.DataFrame(data)
for i,j in enumerate(df['review']):
  if j=='':
    df['review'][i]='xxx'
 
df["text_lower"] = df["review"].str.lower() 

PUNCT_TO_REMOVE = string.punctuation
def remove_punctuation(text):
    """custom function to remove the punctuation"""
    return text.translate(str.maketrans('', '', PUNCT_TO_REMOVE))

df["text_wo_punct"] = df["text_lower"].apply(lambda text: remove_punctuation(text))

nltk.download('stopwords')
", ".join(stopwords.words('english'))

STOPWORDS = set(stopwords.words('english'))
def remove_stopwords(text):
    """custom function to remove the stopwords"""
    return " ".join([word for word in str(text).split() if word not in STOPWORDS])

df["review_stopwords"] = df["text_wo_punct"].apply(lambda text: remove_stopwords(text.lower()))
for i,j in enumerate(df['review_stopwords']):
  if j=='':
    df['review_stopwords'][i]='xxx'
df.head()
# Save the output to csv file
df.to_csv('amazon_review.csv')


print(df.head())