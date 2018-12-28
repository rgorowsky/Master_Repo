#!/usr/bin/env python
# coding: utf-8

# In[11]:


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
import json


# In[3]:


# set up the splinter method
executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=False)


# In[5]:


# define the target URLs
url1 = 'http://wdi.worldbank.org/table/6.4' # direction of trade, from low/high to high/low income economies
url2 = 'http://wdi.worldbank.org/table/6.6' # tariff barriers
url3 = 'http://wdi.worldbank.org/table/6.7' # trade facilitation
url4 = 'http://wdi.worldbank.org/table/6.8' # external debt
url5 = 'http://wdi.worldbank.org/table/6.11' # aid dependency
url6 = 'http://wdi.worldbank.org/table/6.14' # travel and tourism
# browser.visit(url)


# In[9]:


# select the content from the direction of trade table (url1)
start1 = pd.read_html(url1)
trade_direction = start1[2]

trade_direction_list = trade_direction[0]
trade_direction_list


# In[13]:


# jsonify the dataframe TEST
trade_direction.columns = ['country_name', 'toLow_withinRegion_2006', 'toLow_withinRegion_2016', 'toLow_outRegion_2006', 'toLow_outRegion_2016', 'toHi_withinRegion_2006', 'toHi_withinRegion_2016', 'fromLow_withinRegion_2006', 'fromLow_withinRegion_2016', 'fromLow_outRegion_2006', 'fromLow_outRegion_2016', 'fromHi_withinRegion_2006', 'fromHi_withinRegion_2016']
json_trade_direction = trade_direction.to_json( orient='index')
json_trade_direction


# In[10]:


# select the content from the tariff barriers table (url2)
start2 = pd.read_html(url2)
tariff_barriers = start2[2]

#tariff_barriers.head()

tariff_barriers_list = tariff_barriers[0]
tariff_barriers_list


# In[8]:


# select the content from the trade faciliation table (url3)
start3 = pd.read_html(url3)
trade_facil = start3[2]

trade_facil.head()


# In[9]:


# select the content from the external debt table (url4)
start4 = pd.read_html(url4)
external_debt = start4[2]

external_debt.head()


# In[10]:


# select the content from the aid dependency table (url5)
start5 = pd.read_html(url5)
aid_depend = start5[2]

aid_depend.head()


# In[11]:


# select the content from the travel and tourism table (url6)
start6 = pd.read_html(url6)
travel_tourism = start6[2]

travel_tourism.head()


# In[ ]:


# OTHER TABLES - WHAT'S IN THEM?
start6 = pd.read_html(url6)
travel_tourism = start6[2]

travel_tourism.head()

