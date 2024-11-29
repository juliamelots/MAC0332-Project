from selenium import webdriver
from selenium.webdriver.firefox.options import Options

#File for constant values used in other parts of the scrapping scripts

options = Options()
options.add_argument("--start-maximized")
ffprofile = webdriver.FirefoxProfile("/home/bozzetto/.mozilla/firefox/4l6v1o1k.default/")
ffprofile.set_preference("dom.webnotifications.enabled",False)
ffprofile.set_preference("network.cookie.cookieBehavior", 2)
options.profile = ffprofile

OPTIONS = options
TIMEOUT = 30
TIME_BETWEEN_REQUESTS = 0.2
OUTPUT_PATH = './src/main/resources'
TICKET_URL = 'https://www.sptrans.com.br/sptrans/tarifas/'
