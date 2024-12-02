import time
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from movie import Movie
from const import OPTIONS, TIMEOUT, TIME_BETWEEN_REQUESTS, OUTPUT_PATH, TICKET_URL
from theater import Theater
from session import Session
import json

    
def extract_movies(verbose = False):

    driver = webdriver.Firefox(OPTIONS)
    driver.implicitly_wait(TIMEOUT)

    url = 'https://www.ingresso.com/filmes'
    driver.get(url)

    movie_list = []

    #Find movie catalog div
    movie_list_div = driver.find_element(By.XPATH,"//div [@class='flex flex-wrap gap-x-2 min-[515px]:gap-x-4']")
    
    #Get inner div for each movie
    movies_divs = movie_list_div.find_elements(By.XPATH,"./div [@class='mt-[5px] flex flex-col justify-start lg:w-[160px] mx-0 mb-5 w-[94px] min-[375px]:w-28 min-[425px]:w-[129px] min-[515px]:w-[160px] [&_a_>div_>div]:h-[139px] min-[375px]:[&_a_>div_>div]:h-[164px] min-[425px]:[&_a_>div_>div]:h-[190px] min-[515px]:[&_a_>div_>div]:h-60']")
    
    cnt = 0

    for movie in movies_divs:
        try:
            #Extract info from each inner div
            name = movie.find_element(By.XPATH,"./a/h4").text
            url = movie.find_element(By.XPATH,"./a [@class='no-underline']").get_attribute('href')
            img_url = movie.find_element(By.XPATH,"./a/div/div/img [@class='box-border object-cover lg:duration-[0.5s] lg:hover:scale-[1.2]']").get_attribute('src')
        
            curr_movie = Movie(name,url,img_url)
            curr_movie.get_info()
            movie_list.append(curr_movie)
            cnt += 1

            if(verbose):
                print(f'Wrote info about movie: {name}')
        
            #Wait a bit to avoid IP blocking
            time.sleep(TIME_BETWEEN_REQUESTS)
        except Exception as e:
            print(f"Failed to find information about the movie: {movie.text}\n Received the following error message: {e}")

    driver.close()
    return movie_list
        
def extract_theaters(verbose = False):

    driver = webdriver.Firefox(OPTIONS)    
    driver.implicitly_wait(TIMEOUT)

    url = 'https://www.ingresso.com/cinemas'
    driver.get(url)

    theater_list = []

    #Get all divs related to a movie theater
    theaters_divs = driver.find_elements(By.XPATH,"//div [@class='m-[10px] box-border flex justify-between rounded bg-ing-neutral-600 p-2 lg:w-[calc(33.3%-20px)] lg:px-[15px] lg:py-[22px]'] ")
    cnt = 0
    for theater in theaters_divs:
        try:
            #Get all info available about each theater in the catalog page
            theater_a = theater.find_element(By.XPATH,"./a")
            theater_link = theater_a.get_attribute('href')
            theater_simplified_name = theater_link.split('/')[-1]
            theater_name = theater_a.find_element(By.XPATH,"./h3").text

            theater_obj = Theater(theater_name,theater_link)
            theater_obj.get_info() #Get extra info from the theater's own page

            theater_list.append(theater_obj)
            cnt += 1
            if(verbose):
                print(f'Wrote info about theater: {name}')

            #Wait a bit to avoid IP blocking
            time.sleep(TIME_BETWEEN_REQUESTS)
        except Exception as e:
            print(f"Failed to find information about the theater: {theater.text}\n Received the following error message {e}")

    driver.close()
    return theater_list

def get_ticket_prices():
    driver = webdriver.Firefox(OPTIONS)    
    driver.implicitly_wait(TIMEOUT)

    driver.get(TICKET_URL)

    price_table = driver.find_element(By.XPATH,"//table [@style='height: 416px;']")
    prices = price_table.find_elements(By.XPATH,"./tbody/tr")

    pricing = []

    for price in prices:
        price_info = price.find_elements(By.XPATH,"./td")
        pricing.append(
            {
                "transporte": price_info[0].text,
                "preco": float(price_info[1].text[3:].replace(',','.'))
            }
        )

    driver.close()

    return pricing

def save_theaters(path, theater_list):
    file = open(path + f"/cinemas.json",mode = 'w+')
    file.write(json.dumps([theater.to_dict() for theater in theater_list], ensure_ascii=False))
    file.close()

def save_movies(path, movie_list):
    file = open(path + f"/movies.json", mode = 'w+')
    file.write(json.dumps([movie.to_dict() for movie in movie_list], ensure_ascii=False))
    file.close()

def save_sessions(path, session_list):
    file = open(path + f"/sessions.json", mode = 'w+')
    file.write(json.dumps([session.to_dict() for session in session_list], ensure_ascii=False))
    file.close()

def save_pricing(path, pricing_list):
    file = open(path + f"/pricing.json", mode = 'w+')
    file.write(json.dumps(pricing_list, ensure_ascii=False))
    file.close()


def main():

    pricing_list = get_ticket_prices()
    save_pricing(OUTPUT_PATH,pricing_list)

    theater_list = extract_theaters()
    movie_list = extract_movies()
    
    save_movies(OUTPUT_PATH,movie_list)
    save_theaters(OUTPUT_PATH,theater_list)

    session_list = []
    for theater in theater_list:
        session_list.extend(theater.get_sessions())
    
    save_sessions(OUTPUT_PATH,session_list)


if __name__ == '__main__':
    main()

