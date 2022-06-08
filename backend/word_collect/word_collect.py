from bs4 import BeautifulSoup as bs, ResultSet
import urllib.request
import nltk

PARSER = "html.parser"
urls = ["https://docs.python.org/3/whatsnew/3.10.html"]

for url in urls:
    r = urllib.request.Request(url)
    with urllib.request.urlopen(r) as res:
        body = res.read()
    soup = bs(body, PARSER)
    tokens = nltk.word_tokenize(soup.text)

    five_letters = set(x for x in tokens if len(x) == 5)
    print(five_letters)
