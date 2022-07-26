class PickerUtils {
    rgbToHsl(r:number, g:number, b:number):{ fomat:<T>(type:returnType) => T  }{
        const RTemp = r /= 255
        const GTemp = g /= 255
        const BTemp = b /= 255

        const max = Math.max(RTemp, GTemp, BTemp), min = Math.min(RTemp, GTemp, BTemp);
        let h: any, s:number, l:number = (max + min) / 2;

        if(max == min){
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch(max){
                case RTemp: h = (GTemp - BTemp) / d + (GTemp < BTemp ? 6 : 0); break;
                case GTemp: h = (BTemp - RTemp) / d + 2; break;
                case BTemp: h = (RTemp - GTemp) / d + 4; break;
            }

            h /= 6;
        }
        return {
            fomat:(type):any => ({
                toElement:`<div>hsl(${(h * 360).toFixed(0)}&deg;,${s.toFixed(0)},${l.toFixed(1)})<div>`,
                toArray:[h,s,l]
            }[type])
        };
    }

    rgbToHex(r:number, g:number, b:number):string { return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}` }

    hexToRgb(hex:string):(string | null) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
        const [,R,G,B]:string[] = result

        return result ? `${parseInt(R, 16)},${parseInt(G, 16)},${parseInt(B, 16)}` : null
    }
}

type returnType = "toElement" | "toArray";

export default PickerUtils