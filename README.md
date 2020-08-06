# Automating music downloads

This node.js script uses headless chrome browser to navigate sites and stimulate clicks.

## To use:

-   Clone and cd into the directory

```
git clone https://github.com/k4u5h4L/automate-music-download.git && cd automate-music-download
```

-   Install dependencies like cheerio and the browser itself.<br>
    This may take a while as chromium is being downloaded into your local project.

```
npm install
```

-   Now fill in the `songs.txt` file with the music that you need downloaded.<br>
    Write the "song name [space] artist", and write each entry on each line.<br>
    Take the example `songs.txt` included in this repository for reference.

-   Now run the script

```
npm run start
```

This will start chromium and navigate to sites.

## New features:

-   The browser will now block ads! The script has been included with an adblock extension by default.

### Note:

-   On a related note, I do not own the website this script is using, neither do I get anything from the site owner for using it.<br>
    So please use it at your own risk.

-   Since this script uses chromium, RAM usage may be high, i.e. it will open as many tabs as the song you want to download. <br>
    If you don't want the script to crash or hang, please feed in less songs each time. This will be patched in the future.

-   When you use the script for the first time, it will ask for a recaptcha verification, so headless mode is turned off for
    the user to complete the verification and then move on with the download.
