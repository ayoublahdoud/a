import nltk
import re as r
from nltk.stem import PorterStemmer

nltk.download("punkt")
nltk.download("stopwords")
nltk.download("wordnet")

Text = ["hello, python is a great language",
        "python is not a good programming language",
        " C++ has been used for years",
        " I loved that movie [12]"]
stemmed_sentence= []
for sentence in Text:
    
    sentence= r.sub('\[[^]]*\]','',sentence)
    sentence= r.sub(r'[^a-zA-Z0-9\s]','',sentence)
    Stemming= PorterStemmer()
    stemmed=Stemming.stem(sentence)
    stemmed_sentence.append(stemmed)


print (stemmed_sentence)

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
stop_words = set(stopwords.words("english"))



fullsentence=""
for sentence in stemmed_sentence:
    words=word_tokenize(sentence)
    for word in words:
        if word not in stop_words:
            fullsentence=fullsentence+" " +  word   # add a space before each word to handle the case where the first character of
            
print (fullsentence)

#SENTIMENT ANALYSER-------------------------------------------------------------------------------------------------------------
from nltk.sentiment import SentimentIntensityAnalyzer

sentiment = SentimentIntensityAnalyzer()
print(sentiment.polarity_scores(fullsentence))

#EXERCICE 2-----------------------------------------------------------------------------------------------------------

#La base contient 1000 documents, calculer la TF-IDF du mot "compteur" dans le
#document d, sachant que le document d contient 3 fois le mot compteur et que 70 textes
#contiennent également le mot "compteur"

#TFIDF(,wd) = TF(w,d)log(N/DFw)
#TFIDF("compteur",d) = 3 log(1000/70) = 11.5

#Le mot "compteur" apparaît toujours 3 fois dans le document mais apparait cette fois
#dans 900 documents 

#TFIDF("compteur",d) = 3 log(1000/900) = 0.45

