# Sentinic

Sentiment analysis is contextual mining of text which identifies and extracts subjective information in text, and helps a business to understand the social sentiment of their brand, product or service while monitoring online reviews. The reviews provided by the customers on e-commerce websites not only helps the owners to improve their services accordingly but also helps other customers to get an opinion of the products before buying them online. Our project was aimed at developing a web application to perform sentiment analysis on amazon product reviews by leveraging machine learning algorithms. We used SVM, Random Forest and Logistic Regression to train our model from which Logistic regression performed the best. We also implemented a web scraper using Beautiful Soup that gets real time reviews from amazon. The ML model was then used to predict the sentiment of each review which was displayed using interactive visualizations. With online shopping becoming the new trend this application is a one stop solution for business to track the popularity and sentiment of their product. 
### Working of Sentinic :
1. User can run the sentiment analysis on a product from the given choices or he/she can feed 
in the amazon URL of a new product. <br>
2. Once the product is selected then the reviews are scraped from amazon. <br>
3. This scraped data is preprocessed. Preprocessing involves handling missing data, removing 
punctuations, removing stop words, tokenization and lemmatization. <br>
4. Next the features are extracted using TF-IDF vectorizer. <br>
5. Then 3 classification algorithms namely Support Vector Machine, Logistic Regression and 
Random Forest are applied on extracted features. <br>
6. These algorithms predict the sentiment, 1 for positive and 0 for negative and send this data 
to the frontend. <br>
7. Visualizations including overall sentiment and sentiment over time are displayed to the 
user. <br>
