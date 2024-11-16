#! /bin/bash

run_scraping(){
  echo "Do you want to create a new virtual environment? (y/n)"
  read ans

  if [ "$ans" = "y" ]; then 
    echo "What name do you want to use for the virtual environment (default = 'scraping')"
    read virtualenv
    
    if [ -z "$virtualenv"]; then
      virtualenv='scraping'
    fi

    python -m venv "$virtualenv"
    source $virtualenv/bin/activate
    
  elif [ "$ans" = "n" ]; then
    echo "What is the name of the existing virtual environament (default = 'scraping')"
    read virtualenv

    if [ -z "$virtualenv" ]; then
      virtualenv='scraping'
    fi

    source $virtualenv/bin/activate

  else
    echo "Please answer with only 'y' or 'n'"
  fi

  echo "Installing dependencies"
  sleep 2

  pip install poetry
  poetry install

  echo "Starting to run scrapping script"
  sleep 2

  python ./src/main/resources/scraping

  echo "Cleaning environment"
  sleep 2

  deactivate
  if [ "$ans" = "y"]; then
    rm -rf "./$virtualenv"
  fi
}

run_app(){
  if [ "$1" = "prod" ]; then
    docker-compose up backend-prod
  elif [ "$1" = "dev" ]; then
    docker-compose up backend-dev 
  else
    echo "Unknown Environment provided"
  fi
}

echo "Which one do you want to run?"
echo "0) Backend Application (default)" 
echo "1) Scraping"

read app

if [ -z $app ]; then
  app=0
fi

if [ $app -eq 0 ]; then
  echo "Which env do you want to run? (prod/dev)"
  read env
  run_app $env
elif [ $app -eq 1 ]; then
  run_scraping
else 
  echo "Unknown response"
fi