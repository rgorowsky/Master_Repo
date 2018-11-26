# Dependencies
from bs4 import BeautifulSoup
import requests
import os
import pymongo
from splinter import Browser
from splinter.exceptions import ElementDoesNotExist
import pandas as pd
from zipfile import ZipFile
from IPython.display import display_html

# set up the splinter method
executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=False)

# define the target URL
url = 'https://mars.nasa.gov/news'
browser.visit(url)

# select the "title" portion
html = browser.html
soup = BeautifulSoup(html, 'html.parser')

titlePortion = soup.find('div', class_='content_title')
#titlePortion

# select the "paragraph" portion
parPortion = soup.find('div', class_='article_teaser_body')
#parPortion

# use get_text() to only get the needed text
strippedTitle = titlePortion.get_text()
#strippedTitle

# use get_text() to only get the needed text
strippedPar = parPortion.get_text()
#strippedPar

# Use splinter to navigate the site and find the image url for the current Featured Mars Image and... 
# assign the url string to a variable called featured_image_url
# define the target URL
url2 = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
browser.visit(url2)

# redefine html and soup
html = browser.html
soup = BeautifulSoup(html, 'html.parser')

# search code for image tags
image = soup.find('article', class_="carousel_item")
cutImage = image['style']
# cutImage

# try and get only the URL
featured_image_url = cutImage.split("url")[1]
# featured_image_url

# Visit the Mars Weather twitter account here and scrape the latest 
# Mars weather tweet from the page. Save the tweet text for the weather 
# report as a variable called mars_weather.
    # define the target URL
url3 = 'https://twitter.com/marswxreport?lang=en'
browser.visit(url3)

    # redefine html and soup
html = browser.html
soup = BeautifulSoup(html, 'html.parser')

# scrape the latest tweet
tweet = soup.find('div', class_='js-tweet-text-container')
# tweet

# report as a variable called mars_weather.
mars_weather = tweet.find('p').text
# mars_weather

# Visit the Mars Facts webpage here and use Pandas to scrape the table 
# containing facts about the planet including Diameter, Mass, etc.
url4 = 'https://space-facts.com/mars/'
browser.visit(url4)

# redefine html and soup
html = browser.html
soup = BeautifulSoup(html, 'html.parser')

table = soup.find('div')

# find the rows within the table
rows = table.find_all('tr')

# find the tds elements within the rows and print out the rows and row values
facts = []
values = []

for row in rows:
    tds = row.find_all('td')
    fact = tds[0].get_text()
    facts.append(fact)
    value = tds[1].get_text()
    values.append(value)
    
#     print(fact)
#     print(value)
#     print(facts)
#     print(values)

# I have two lists, put those into a dataframe
marsFactsTable = pd.DataFrame({
    'facts': facts,
    'values': values
})

# marsFactsTable

# read the table into an HTML table
marsFactsTable.to_html("marsFacts.html")

# Visit the USGS Astrogeology site here to obtain high resolution images for each of Mar's hemispheres.
url5 = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
browser.visit(url5)

# redefine html and soup
html = browser.html
soup = BeautifulSoup(html, 'html.parser')

# Get the list of links 
listOfLinks = []

testLinks = browser.find_by_tag('h3')
for i in range(len(testLinks)):
    hemisphere = {}
    browser.find_by_tag('h3')[i].click()
    sample = browser.find_link_by_text('Sample').first
    hemisphere['image_url'] = sample['href']
    hemisphere['title'] = browser.find_by_css('h2.title').text
    listOfLinks.append(hemisphere)
    browser.back()
    
# print(listOfLinks)

