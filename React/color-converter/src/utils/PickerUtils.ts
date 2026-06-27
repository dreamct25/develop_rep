class PickerUtils {

    public static rgbToHsl(r: number, g: number, b: number): {
        fomat: <T extends keyof returnType>(type: T) => returnType[T]
    }{
        const RTemp = r /= 255
        const GTemp = g /= 255
        const BTemp = b /= 255

        const max = Math.max(RTemp, GTemp, BTemp), min = Math.min(RTemp, GTemp, BTemp);
        let h: number, s:number, l:number = (max + min) / 2;

        if(max === min){

            h = s = 0;

        } else {

            const d = max - min;

            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            // switch(max){
            //     case RTemp: h = (GTemp - BTemp) / d + (GTemp < BTemp ? 6 : 0); break;
            //     case GTemp: h = (BTemp - RTemp) / d + 2; break;
            //     case BTemp: h = (RTemp - GTemp) / d + 4; break;
            // }

            h = {
                [RTemp]: (GTemp - BTemp) / d + (GTemp < BTemp ? 6 : 0),
                [GTemp]: (BTemp - RTemp) / d + 2,
                [BTemp]: (RTemp - GTemp) / d + 4
            }[max]

            h /= 6;
        }

        return {
            fomat: (type) => ({
                toElement: [(h * 360).toFixed(0), s.toFixed(0), l.toFixed(1)],
                toArray:[h, s, l]
            }[type])
        };
    }

    public static rgbToHex(r: number, g: number, b: number): string { 
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}` 
    }

    public static hexToRgb(hex: string): string {

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        
        if(result !== null){

            const [, R, G, B] = result

            return `${parseInt(R, 16)},${parseInt(G, 16)},${parseInt(B, 16)}`
        }

         return '0,0,0'
    }
}

type returnType = { toElement: string[], toArray: number []};

export default PickerUtils