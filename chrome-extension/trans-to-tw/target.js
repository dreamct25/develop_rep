const renderStyle = document.createElement("style");
const loadingStyle = document.createElement("style");
const loadingDiv = document.createElement("div")

const sleep = time => new Promise((resolve) => setTimeout(() => resolve() ,time)) 

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    if (request.enableDeleteAction) {

        const css = `
            @font-face {
                font-family: "to-c";
                src: url("${request.url}") format("truetype");
            }
            * {
                font-family: "to-c", sans-serif !important;
                font-weight: bold;
            }
        `;

        try {
            await chrome.storage.local.set({ isToCTranslateActive: true })

            renderStyle.textContent = css;
        
            document.head.appendChild(renderStyle);

            sendResponse({ info: "enable" });
            
        } catch (err) {
            sendResponse({ info: "enable fail" });
        }
    }

    if (request.disabledDeleteAction) {

        try {
            await chrome.storage.local.set({ isToCTranslateActive: false })
            
            document.head.removeChild(renderStyle)
                
            sendResponse({ info: "disabled" });
            
        } catch (err) {
            sendResponse({ info: "disabled fail" });
        }
    }

    if(request.getSetting) {

        const loadingCss = `
            .loads {
                position: fixed;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                background-color: rgba(30,30,30,.5);
                z-index: -1;
                opacity: 0;
                transition: .5s;
                backdrop-filter: blur(10px);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-family: Arial,sans-serif !important;
                font-weight: 0 !important;
                font-size: 22px;
                letter-spacing: 5px;
                color: white !important;
            }
            .loads.toggle {
                opacity: 1;
                z-index: 200;
            }
        `
        loadingStyle.textContent = loadingCss

        document.head.appendChild(loadingStyle);

        await sleep(200)

        loadingDiv.className = 'loads'
        loadingDiv.textContent = 'Translate ...'

        document.body.appendChild(loadingDiv);

        const fontCss = `
            @font-face {
                font-family: "to-c";
                src: url("${request.url}") format("truetype");
            }
            * {
                font-family: "to-c", sans-serif !important;
                font-weight: bold;
            }
        `;

        try {

            const storeItem =  await chrome.storage.local.get('isToCTranslateActive')
            
            if(storeItem?.isToCTranslateActive) {

                loadingDiv.classList.add('toggle')

                await sleep(500)

                renderStyle.textContent = fontCss;
                
                document.head.appendChild(renderStyle);

                sendResponse({ info: "enable" });

                await sleep(500)
                
                loadingDiv.classList.remove('toggle')
            }

        } catch (err) {
            sendResponse({ info: "enable fail" });
        }
    }
});

// startObserving();

