# import modules
import requests
from bs4 import BeautifulSoup
import datetime
import pandas as pd
import sys
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
    cus_res1.append(item.get_text())
    
    item = element.find("span", {'data-hook':"review-date"}) #date
    s=item.get_text()
    x=s.find(" on ")
    s=s[x+4:]
    date=datetime.datetime.strptime(s,"%d %B %Y").strftime("%Y-%m-%d")
    cus_res2.append(date)

    item = element.find("a", {'data-hook':"review-title"}) #title
    cus_res3.append(item.get_text().replace("\n",""))

    item = element.find("span",{'data-hook':"review-body"}) #review
    s1=item.get_text()
    s1= s1.replace("\xa0","").replace("\n\n","").lstrip()
    cus_res4.append(s1)

    flag=0
    for item in element.find_all("span", {'data-hook':"helpful-vote-statement"}): #vote
        flag=1
        s=item.get_text()
        if s[0]=="O":
          s=1
        else:
          x=s.find("p")
          s=int(s[:x-1].replace(",",""))        
        cus_res5.append(s)
    if flag==0:
      cus_res5.append(0)
    
    item = element.find("i", {'data-hook':"review-star-rating"}) #rating
    cus_res6.append(int(item.get_text()[0]))


 
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
url += ticker

for i in range(1,51):
  url1= f"{url}{i}"
  soup = html_code(url1)
  cus_reviews(soup)

# initialise the data dictionary
data = {'name': cus_res1,'date':cus_res2,'title':cus_res3,'review': cus_res4,'vote':cus_res5,'rating':cus_res6}

# Create DataFrame
df = pd.DataFrame(data)
 
# Save the output to csv file
df.to_csv('amazon_review.csv')

print(df.head())