import time
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
import json
from session import Session
from const import OPTIONS, TIMEOUT, TIME_BETWEEN_REQUESTS
import pytest

class Theater():

    def __init__(self, name, url):
        self.name = name
        self.url = url
        self.session_list = []

    def get_info(self):
        #Access Theater's webpage
        driver = webdriver.Firefox(OPTIONS)
        driver.implicitly_wait(TIMEOUT)
        driver.maximize_window() #maximize window to avoid cookies obscuring any objects on the screen
        driver.get(self.url) 

        #Search for div with informations related to the theater
        info_div = driver.find_element(By.XPATH,"//div [@class='flex flex-col justify-center gap-1 lg:gap-2']")
        self.address = info_div.find_element(By.XPATH,"./address").text
        
        #Check if there are available sessions in this theater
        try:
            day_list = driver.find_element(By.XPATH,"//div [@class='splide__list']")
            days = day_list.find_elements(By.XPATH, "./div")
            days[0].click()
        except Exception:
            no_sessions_list = driver.find_element(By.XPATH,"//div [@class='sm:ml-5']")
            if no_sessions_list.text == 'Ainda não temos sessões :(':
                driver.close()
                return
            else:
                raise RuntimeError()
        
        #Get sessions for each day
        for day in days:
            try:
                day.click()
            except:
                print('não foi possivel trocar o dia')
            time.sleep(TIME_BETWEEN_REQUESTS)
            day_text = day.text.split('\n')[1]
            
            sessions_div = driver.find_element(By.XPATH,"//div [@class='mx-3 my-5 sm:mb-8 lg:mx-0']")
            movies_sessions = sessions_div.find_elements(By.XPATH,"./div [@class='relative my-5 scroll-mt-[250px] overflow-hidden rounded-[10px] bg-ing-neutral-600 p-4']")
            for movie in movies_sessions:
                movie_name = movie.get_attribute('id')
                movie_sessions = movie.find_element(By.XPATH,"./div/div [@class='flex flex-col']")
                sessions = movie_sessions.find_elements(By.XPATH,"./div [@class='mx-0 mb-[15px] mt-0 flex flex-col']")
                for session_type in sessions:
                    session_categories = [category.text for category in session_type.find_element(By.XPATH,"./div [@class='flex gap-[10px] pl-[3px]']").find_elements(By.XPATH,"./div")]
                    try:
                        session_times = session_type.find_elements(By.XPATH,"./div/a/div | ./div/button/a/div | ./div/button/button/div")
                    except Exception as e:
                        print(e)
                    session_times = [session_time.text for session_time in session_times]
                    for session_time in session_times:
                        self.session_list.append(Session(session_time,day_text,self.name,movie_name,session_categories))
            for movie in sessions[::-1]:
                pass
                
        #Go to Google Maps' page
        info_div.find_element(By.XPATH,"./button").click()

        driver.switch_to.window(driver.window_handles[1])
        wait = WebDriverWait(driver,TIMEOUT)
        wait.until(lambda d : driver.current_url.__contains__('/@') and driver.current_url.__contains__('z/'))
        current_url = driver.current_url
        driver.close()
        
        driver.switch_to.window(driver.window_handles[0])
        self.coordinates = tuple([ i.strip('@') for i in current_url.split('/')[6].split(',')[:2]])
        
        driver.close()

    def get_sessions(self):
        return self.session_list

    def to_dict(self):
        try:
            return  {
            'name': self.name,
            'url': self.url,
            'address': self.address,
            'coordinates': self.coordinates
            }
        except Exception:
            print(f"Couldn't return dictionary for cinema: {self.name}")
            return {}

    def to_json(self):
        return json.dumps(
        self.to_dict(),
        ensure_ascii=False)

