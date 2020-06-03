from django.shortcuts import render


# Create your views here.

from bs4 import BeautifulSoup
import requests
from django.http import JsonResponse


# source = requests.get('https://www.worldometers.info/coronavirus').text

# soup = BeautifulSoup(source,'lxml')
# match = soup.find_all('div',class_="maincounter-number")
# for m in match :
#     print(m.span.text)
numbs = {}


def getCountryData(request,name):
    countryName = name.lower()
    url = "https://www.worldometers.info/coronavirus/country/" + countryName + "/"
    source = requests.get(url).text

    soup = BeautifulSoup(source,'lxml')
    match = soup.find_all('div',class_="maincounter-number")
    
    numbs['infected'] = match[0].span.text 
    numbs['deaths'] = match[1].span.text
    numbs['recovered'] = match[2].span.text
    return render(request,'second.html',numbs)

def index(request):
  
    source = requests.get('https://www.worldometers.info/coronavirus/#countries').text
    soup = BeautifulSoup(source,'lxml')
    match = soup.find('table',id="main_table_countries_today").tbody
    print(match)
    names = match.find_all('a',class_="mt_a")
    countries = []
    countries.append("Global")
    for n in names :
        countries.append(n.text)
    numbs['country_names'] = countries
    # answer = request.POST['dropdown']
    # print(answer)

    return render(request,"index.html",numbs)


    # source = requests.get('https://www.worldometers.info/coronavirus').text

    # soup = BeautifulSoup(source,'lxml')
    # match = soup.find_all('div',class_="maincounter-number")
    # numbs = {}
    # numbs['infected'] = match[0].span.text
    # numbs['deaths'] = match[1].span.text
    # numbs['recovered'] = match[2].span.text