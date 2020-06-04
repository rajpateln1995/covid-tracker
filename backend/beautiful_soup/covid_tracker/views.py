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





def getCountryData(request,name):
    countryName = name.lower()
    flag = False
    if name == 'Global':
        url = 'https://www.worldometers.info/coronavirus/#countries'
    elif name == 'USA':
        url = 'https://www.worldometers.info/coronavirus/country/us'
        flag = True
    else:
        url = "https://www.worldometers.info/coronavirus/country/" + countryName + "/"
        flag = True
    source = requests.get(url).text
    soup = BeautifulSoup(source,'lxml')
    match = soup.find_all('div',class_="maincounter-number")
    if flag :
        flag = soup.find_all('div',class_="content-inner")
        attr = flag[0].img['src']
        img_url = "https://www.worldometers.info" + attr

    data = {}
    # https://www.worldometers.info/img/flags/small/tn_uk-flag.gif
    data['infected'] = match[0].span.text 
    data['deaths'] = match[1].span.text
    data['recovered'] = match[2].span.text
    if flag:
        data['img_url'] = img_url
    else:
        data['img_url'] = ""
    return JsonResponse(data)

def index(request):
  
    source = requests.get('https://www.worldometers.info/coronavirus/#countries').text
    soup = BeautifulSoup(source,'lxml')
    match = soup.find('table',id="main_table_countries_today").tbody
    names = match.find_all('a',class_="mt_a")
    countries = []
    numbs = {}
    countries.append("Global")
    for n in names :
        countries.append(n.text)
    numbs['country_names'] = countries
    # answer = request.POST['dropdown']
    # print(answer)

    return JsonResponse(numbs)


   