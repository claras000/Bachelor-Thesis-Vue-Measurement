const puppeteer = require("puppeteer");
const microtime = require('microtime');

(async () => {
    // Funktion, um die Zeit in Mikrosekunden zu bekommen
    const getTimeInMicroseconds = () => microtime.now();

    let lastTime = getTimeInMicroseconds(); // Zeit zu Beginn speichern
    console.log(microtime.now(),"start");


    // Funktion zur Berechnung und Ausgabe des Zeitabstands in Mikrosekunden
    const logTimeDiff = (message) => {
        const currentTime = getTimeInMicroseconds();
        const diff = currentTime - lastTime; // Berechnet die Differenz in Mikrosekunden
        console.log(currentTime / 1e6, message, `(Diff: ${diff} µs)`); // Zeigt den Zeitabstand in Mikrosekunden an
        lastTime = currentTime; // Zeit für den nächsten Vergleich speichern
    };

    const browser = await puppeteer.launch({
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
        headless: true,
        executablePath: "/usr/bin/chromium-browser",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },{timeout: 10000});



    // Variabeln
    const page = await browser.newPage();
    const targetLogMessage = "colors are changed";


    logTimeDiff("starting Browser");
    console.log(microtime.now(),"starting Browser");

    // Listener für renderzustand

    await page.goto("http://project:3000", {
        waitUntil: "load",
        timeout: 18000
    });

    page.on('console', async (message) => {
        if (message.text().includes(targetLogMessage)) {
            logTimeDiff("change color");
            console.log(microtime.now(), "change color");
            await browser.close();
            logTimeDiff("closing Browser");
            console.log(microtime.now(), "closing Browser");
        }
    });

    await page.waitForSelector('button.colorButton',{visible: true,timeout: 180000});
    logTimeDiff("load page");
    console.log(microtime.now(),"load page");
    await page.click('button.colorButton',{timeout: 180000});



})();
