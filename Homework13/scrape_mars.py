#!/usr/bin/env python
# coding: utf-8




# In[2]:


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

### defin the initiation of the browser here
def init_browser():

# In[3]:


# set up the splinter method
    executable_path = {'executable_path': r'C:\Users\rgoro\Documents\robby school\Master_Repo\Homework13\chromedriver.exe'}
    return Browser('chrome', **executable_path, headless=False)

### define the scrape method below:
def scrape():
    browser = init_browser()
    mars_scrape_objects = {}

# In[4]:

# define the target URL
    url = 'https://mars.nasa.gov/news'
    browser.visit(url)


# In[5]:


    # select the "title" portion
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    titlePortion = soup.find('div', class_='content_title')
    titlePortion


    # In[6]:


    # select the "paragraph" portion
    parPortion = soup.find('div', class_='article_teaser_body')
    parPortion
    # In[7]:
    # use get_text() to only get the needed text
    mars_scrape_objects["strippedTitle"] = titlePortion.get_text()
    # strippedTitle
    #put it to the mars_scrape_objects dictionary
    # mars_scrape_objects["strippedTitle"] = strippedTitle
    ##### this is where I need to put in an entry to a Mongo database.
    # In[8]:
    # use get_text() to only get the needed text
    # strippedPar = parPortion.get_text()
    mars_scrape_objects["strippedPar"] = parPortion.get_text()
    # In[9]:
    # Use splinter to navigate the site and find the image url for the current Featured Mars Image and... 
    # assign the url string to a variable called featured_image_url
    # define the target URL
    url2 = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    baseURL = 'https://www.jpl.nasa.gov'
    browser.visit(url2)

    # redefine html and soup
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    # In[10]:
    # search code for image tags
    image = soup.find('article', class_="carousel_item")
    cutImage = image['style']
    cutImage
    
    featured_image = cutImage.split("url")[1]
    # featured_image_url = url + featured_image    REMOVING THIS PART - BECAUSE I DON'T WANT MY "URL +" PART HERE

    removeOne_featured_image_url =featured_image.replace("('", "").strip()
    final_featured_image_url = removeOne_featured_image_url.replace("')", "").strip()
    # final_final_image_url = final_featured_image_url.replace(";", "").strip() I PUT THIS AS RIGHT SIDE OF DIC OBJECT

    # testSomething
    mars_scrape_objects["final_final_image_url"] = baseURL + final_featured_image_url.replace(";", "").strip()

    # In[13]:
    # Visit the Mars Weather twitter account here and scrape the latest 
    # Mars weather tweet from the page. Save the tweet text for the weather 
    # report as a variable called mars_weather.

    # define the target URL
    url3 = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url3)

    # redefine html and soup
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    # In[14]:
    # scrape the latest tweet
    tweet = soup.find('div', class_='js-tweet-text-container')
    tweet

    # In[15]:
    # report as a variable called mars_weather.
    # mars_weather = tweet.find('p').text
    mars_scrape_objects["mars_weather"] = tweet.find('p').text

    # In[16]:


    # Visit the Mars Facts webpage here and use Pandas to scrape the table 
    # containing facts about the planet including Diameter, Mass, etc.
    url4 = 'https://space-facts.com/mars/'
    browser.visit(url4)

    # redefine html and soup
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    # In[17]:
    table = soup.find('div')

    # find the rows within the table
    rows = table.find_all('tr')
    # rows

    # In[18]:
    type(rows)

    # In[19]:
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
    # print(facts)
    # print(values)

    # In[20]:
    # I have two lists, put those into a dataframe
    marsFactsTable = pd.DataFrame({
        'facts': facts,
        'values': values
    })
    # marsFactsTable

    # In[21]:
    # read the table into an HTML table
    # marsFactsTable.to_html("marsFacts.html")  # commented out to try the method with ABe 12/9

    # marsFactsTable = pd.DataFrame({           # commented out to try the method with ABe 12/9
    # 'facts': facts,                           # commented out to try the method with ABe 12/9
    # 'values': values                          # commented out to try the method with ABe 12/9
    # })                                        # commented out to try the method with ABe 12/9

    url4 = 'https://space-facts.com/mars/'
    # browser.visit(url4)

    marsFactsTable.columns = ['description', 'value']
    marsFactsTable.set_index('description', inplace=True)

    table = marsFactsTable.to_html()
    table = table.replace('\n', '')

    mars_scrape_objects['facts'] = table

    #print(table)


    # In[30]:


    # Visit the USGS Astrogeology site here to obtain high resolution images for each of Mar's hemispheres.
    url5 = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url5)

    # redefine html and soup
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')


    # In[31]:


    # I think I'm looking for 'div' class="item"
    # targetImages = soup.find_all('div', class_="item")

    # #titles = targetImages.href
    # # titles

    # for targetImage in targetImages:
    #     links = targetImage.find('a')
    #     link = links.get("href")
    #     print(links)
    #     print(link)


    # In[32]:


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
        
    # print(listOfLinks)
    hemisphere1_dirty = listOfLinks[0]
    # hemisphere1_dirty

# In[ ]:
    # hemisphere1 = hemisphere1_dirty.pop("image_url", None)
    mars_scrape_objects["hemisphere1"] = hemisphere1_dirty.pop("image_url", None)

    hemisphere2_dirty = listOfLinks[1]    
    mars_scrape_objects["hemisphere2"] = hemisphere2_dirty.pop("image_url", None)

    hemisphere3_dirty = listOfLinks[2]    
    mars_scrape_objects["hemisphere3"] = hemisphere3_dirty.pop("image_url", None)

    hemisphere4_dirty = listOfLinks[3]    
    mars_scrape_objects["hemisphere4"] = hemisphere4_dirty.pop("image_url", None)

# In[ ]:

    browser.quit()
    return mars_scrape_objects

