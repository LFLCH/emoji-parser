import os
import requests
from bs4 import BeautifulSoup
from unidecode import unidecode
import re

def format_file_name(name):
    return re.sub(r'(_)\1+', r'\1',  re.sub(r'[^\w\s-]|_+', '_', unidecode(name).lower()).replace(' ','_'))

url = 'https://emojipedia.org/microsoft-teams/'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
imgs = soup.find('article').find('ul', {'class': 'emoji-grid'}).find_all('img')
directory = 'animated-emojis'

progression_message=''
for i,img in enumerate(imgs):
    src = img['src']
    if src == '/static/img/lazy.svg':
        src = img['data-src']
    img['src']=src
    
    name = img['alt']
    if not os.path.isfile(directory+'/'+format_file_name(name)+'.png'):
        response = requests.get(src)
        image_content = response.content
        with open('animated-emojis/'+format_file_name(name)+'.png', 'wb') as f:
            f.write(image_content)
        print(' ' * len(progression_message),end='\r')
        progression_message = str(i+1)+"/"+str(len(imgs))+" : "+name+" ("+format_file_name(name)+".png)"
        print(progression_message,end='\r')


# Get a list of all the PNG files in the directory
png_files = [f for f in os.listdir(directory) if f.endswith('.png')]


# Create an HTML file structure
with open('animated-emojis.html', 'w') as f:
    f.write('<html>\n')
    f.write('<link rel="stylesheet" href="style.css">\n')
    f.write('<script src="script.js" async></script>\n')
    f.write('<body>\n')
    f.write('<input id="search" name="search-emojis" type="text"">\n')
    f.write('<div id="emoji-grid">\n')
    f.write('</div>')
    f.write('</body>\n')
    f.write('</html>\n')

with open('emoji-names.json','w') as f:
    files = '['
    for img in imgs:
        name = img['alt']
        png_file = format_file_name(name)+'.png'
        if png_file in png_files:
            data_src =img['src']
            files+='{"name":"'+name+'", "src":"/animated-emojis/'+png_file+'", "data_src":"'+data_src+'"'+'}\n'
            if img!=imgs[-1]:
                files+=','
        else :
            print(png_file)
    files+=']'
    f.write(files)
