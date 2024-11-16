import time
from selenium import webdriver
from selenium.webdriver.common.by import By
import json
from const import OPTIONS, TIMEOUT
import pytest

class Movie():

    def __init__(self, name, url, img_url):
        self.name = name
        self.url = url
        self.img_url = img_url

    def __str__(self):
        return self.name

    def get_info(self):
        #Access movie webpage
        driver = webdriver.Firefox(OPTIONS)
        driver.implicitly_wait(TIMEOUT)
        driver.get(self.url)

        #Get movie info from summary div
        movie_info = driver.find_element(By.XPATH,"//div [@class='relative flex flex-col lg:mt-2']")
        self.rating = movie_info.find_element(By.XPATH,"./div/div/button/div ").text.strip()
        self.duration = movie_info.find_element(By.XPATH,"./div/span [@class='mr-4 border-r border-solid border-ing-neutral-400 pr-4 text-xs lg:text-sm lg:leading-4']").text.strip()
        self.synopsis = movie_info.find_element(By.XPATH,"./div/span [@class='line-clamp-2 max-w-[400px] text-sm leading-none']").text
        self.categories = [category.strip() for category in movie_info.find_element(By.XPATH,"./div/span [@class='text-xs lg:flex-1 lg:pr-3 lg:text-sm lg:leading-4']").text.split(',')]
        
        driver.close()

    def to_dict(self):
        return {
                'name': self.name,
                'url': self.url,
                'img_url':  self.img_url,
                'rating':  str(self.rating),
                'duration':  str(self.duration),
                'synopsis':  self.synopsis,
                'categories':  self.categories
        }
    
    def to_json(self):
        return json.dumps(
            self.to_dict(),
            ensure_ascii=False
        )

