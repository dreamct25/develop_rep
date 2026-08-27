import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilesService {

    public scrollToPos<T>(
        element: T,
        scrollSetting: { direction: 'top' | 'left', scrollPos: number, duration: number }
    ): void {
        let animateScroll: FrameRequestCallback
        const [keyI, keyII, keyIII] = Object.keys(scrollSetting) as ['direction', 'scrollPos', 'duration']
        const direction: 'scrollTop' | 'scrollLeft' = `scroll${scrollSetting[keyI] === 'top' ? 'Top' : 'Left'}`
        const startPos: number = element[direction]
        const changePos: number = scrollSetting[keyII] - startPos
        const startTimeStamp: number = +new Date()

        const animationSettings: (animationSetting: {
            currentTime: number
            startVal: number
            changeVal: number
            animateDuration: number
        }) => number = animationSetting => {
            const { currentTime, startVal, changeVal, animateDuration }: typeof animationSetting = animationSetting
            let currentTimeTemp: number = currentTime
            currentTimeTemp /= animateDuration / 2
            if (currentTimeTemp < 1) return (changeVal / 2) * currentTimeTemp * currentTimeTemp + startVal
            currentTimeTemp -= 1
            return (-changeVal / 2) * (currentTimeTemp * (currentTimeTemp - 2) - 1) + startVal
        };

        (animateScroll = () => {
            const currentTimeStamp: number = +new Date() - startTimeStamp
            element[direction] = Number(animationSettings({
                currentTime: currentTimeStamp,
                startVal: startPos,
                changeVal: changePos,
                animateDuration: scrollSetting[keyIII]
            }))

            currentTimeStamp < scrollSetting[keyIII] ? requestAnimationFrame(animateScroll) : element[direction] = scrollSetting[keyII]
        })()
    }

    public useSleep(time: number): Promise<void> {

        return new Promise(resolve => setTimeout(() => resolve(), time))
    }

    public hideBodyScollBar(status: boolean): void {

        document.body.style.cssText = status ? 'overflow: hidden;' : ''
    }
}