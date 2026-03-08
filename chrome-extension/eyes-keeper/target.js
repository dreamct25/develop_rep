const renderStyle = document.createElement("style");
const loadingStyle = document.createElement("style");
const loadingDiv = document.createElement("div")

const maskDiv = document.createElement("div")
maskDiv.className = 'masks'

const sleep = time => new Promise((resolve) => setTimeout(() => resolve() ,time)) 

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    if(request.valChange){
        const changeVal = (request.val / 100).toFixed(2)
        maskDiv.style.cssText = `background-color: rgba(0,0,0,${changeVal})`

        sendResponse({ count: changeVal });
    }

    if (request.enableDeleteAction) {

        const css = `
            .masks {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,0,0,${parseInt(request.val) / 100});
                pointer-events: none;
                z-index: 99999;
                opacity: 0;
                transition: .3s ease;
            }
            .masks.active {
                opacity: 1;
            }
        `;

        try {
            await chrome.storage.local.set({ isEyeKeepActive: true })

            renderStyle.textContent = css;
        
            document.head.appendChild(renderStyle);

            document.body.appendChild(maskDiv)

            await sleep(500)

            maskDiv.classList.add('active')

            sendResponse({ info: "enable" });
            
        } catch (err) {
            sendResponse({ info: "enable fail" });
        }
    }

    if (request.disabledDeleteAction) {

        try {
            await chrome.storage.local.set({ isEyeKeepActive: false })

            maskDiv.classList.remove('active')

            await sleep(600)
            
            document.head.removeChild(renderStyle)

            document.body.removeChild(maskDiv)
                
            sendResponse({ info: "disabled" });
            
        } catch (err) {
            sendResponse({ info: "disabled fail" });
        }
    }

    if(request.getSetting) {

        const storeRangeItem =  await chrome.storage.local.get('eyeKeepRange')

        const val = storeRangeItem?.eyeKeepRange ? storeRangeItem?.eyeKeepRange : '100'

        const css = `
            .masks {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,0,0,${parseInt(val) / 100});
                pointer-events: none;
                z-index: 99999;
                opacity: 0;
                transition: .3s ease;
            }
            .masks.active {
                opacity: 1;
            }
        `;

        renderStyle.textContent = css;

        try {

            const storeItem =  await chrome.storage.local.get('isEyeKeepActive')
            
            if(storeItem?.isEyeKeepActive) {

                renderStyle.textContent = css;
                
                document.head.appendChild(renderStyle);

                document.body.appendChild(maskDiv)

                await sleep(500)

                maskDiv.classList.add('active')

                sendResponse({ info: "enable" });

                // await sleep(500)
            }

        } catch (err) {
            sendResponse({ info: "enable fail" });
        }
    }
});

// startObserving();

