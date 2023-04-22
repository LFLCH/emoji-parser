# emoji-parser
I loove <img src="https://em-content.zobj.net/source/microsoft-teams/337/star-struck_1f929.png" title="Star-Struck" height='25'> the new [Microsoft's emojis](https://emojipedia.org/microsoft-teams/)<img src="https://em-content.zobj.net/source/microsoft-teams/337/window_1fa9f.png" height="25">.<br>
This funny project aims to easily retrieve them, with the possility to run it locally.

## See the running demo
It runs on the [GitHub Pages](https://lflch.github.io/emoji-parser/) of this repository. Have fun !

## Run it from you machine
 Open a local server. In VSCode, you just need to have the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension installed, and running.

## Everything locally
Run the python script in order to load all the images locally.<br>
There are almost 3000 images, so be patient, it may take a while !
```bash
# init loading 
python3 emojis-loader.py
```
Then, change the ```local_load``` value to ```true``` from the ```script.js``` file.