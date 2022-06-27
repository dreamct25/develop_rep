
import { Injectable } from '@angular/core';

type dataKeysType = {
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  public data!: {}[]
  public dataKeys: string[] = [
    "Id",
    "Name",
    "Tel",
    "Description",
    "Add",
    "Zipcode",
    "Grade",
    "Spec",
    "Region",
    "Town",
    "Picture1",
    "Picdescribe1",
    "Picture2",
    "Picdescribe2",
    "Picture3",
    "Picdescribe3",
    "Parkinginfo",
    "Serviceinfo",
    "CeilingPrice",
    "LowestPrice",
    "Px",
    "Py"]
  constructor() { }

  async datas() {
    let cros = "https://cors-anywhere.herokuapp.com/"
    let res = await fetch(`${cros}https://gis.taiwan.net.tw/XMLReleaseALL_public/hotel_C_f.json`)
    if (res.status === 200) {
      await res.json().then(res => this.data = res.XML_Head.Infos.Info)
      let dataTemp = this.data.map((item: dataKeysType) => {
        let obj: dataKeysType = {}
        Object.keys(item).forEach((useKey: string) =>
          this.dataKeys.forEach((matchKey: string) => {
            if (matchKey === useKey) {
              obj[matchKey] = item[useKey]
              switch (matchKey) {
                case "Px":
                case "Py":
                  obj[matchKey] = item[useKey].toFixed(3)
                  break
                case "Tel":
                  obj[matchKey] = obj[matchKey].replace(/886-/g, "0")
                  break
                case "Spec":
                case "Serviceinfo":
                  obj[matchKey] = obj[matchKey] === "" ? [] : obj[matchKey].split(";").filter((str: string) => str !== "")
                  break
              }
            }
          })
        )
        obj.inCollect = false
        return obj
      })
      this.data = dataTemp
      return [{ message: "success", data: this.data }]
    } else {
      return [{ message: "error", data: res.statusText }]
    }
  }

}
