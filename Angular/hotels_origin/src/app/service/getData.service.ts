
import { Injectable } from '@angular/core';
import type { dataType, respDataType } from '@/app/types'

@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  private dataKeys: keyof respDataType = [
    "HotelID",
    "HotelName",
    "Description",
    "Telephones",
    "PostalAddress",
    "AccessibilityRooms",
    "HotelClasses",
    "CeilingPrice",
    "LowestPrice",
    "ParkingInfo",
    "Images",
    "PositionLon",
    "PositionLat",
    "ServiceInfo",
    "RoomInfo"
  ]

  async datas(obj: {
    page: number, 
    per_page: number,
    have_img?: boolean,
    s?: string
    col?: string,
    type?: string
  }): Promise<{
    message: string,
    data: {
      data: dataType[],
      page: number
      perPage: number
      total: number
      totalPage: number
    } | undefined
  }> {

    const queryStr = Object.entries(obj)
      .map(([key, value]) => value ? `${key === 'page' ? 'cur_page' : key}=${value}` : '')
      .filter(row => row !== '')
      .join('&')

    let data = []
    
    const res = await fetch(`https://proxy-service-three.vercel.app/test/hotels?${queryStr}`)
    
    if (res.status === 200) {

      const result = await res.json() as { data: { data: respDataType[] } }
      
      data = result.data.data.map(item => {
        
        const matchObj = Object.fromEntries(this.dataKeys.map(keyRow => 
          [keyRow, (item as Record<string, any>)[keyRow]]
        ))

        if(matchObj['ParkingInfo']) {

          matchObj.ParkingInfo = 
            item.ParkingInfo ?
              item.ParkingInfo
                .replace('車位:', '')
                .replace(/(\d+)/g, ' $1 ')
                .replace(/\s+/g, ' ')
                .trim()
              : ''
        }

        if(matchObj['RoomInfo']) {

          matchObj.RoomInfo = 
            Array.from(
              new Set(
                item.RoomInfo ?
                  item.RoomInfo
                    .split(";")
                    .filter(str => str !== "")
                    .map(roomRow => 
                      roomRow
                        .replace(/(\d+)/g, ' $1 ')
                        .replace(/\s+/g, ' ')
                        .trim()
                    )
                  : []
              )
            )
        }

        if(matchObj['ServiceInfo']) {

          matchObj.ServiceInfo = 
            item.ServiceInfo ?
              item.ServiceInfo
                .split(",")
                .filter(str => str !== "") 
              : []
        }

        if(matchObj['Telephones']) {

          matchObj.Telephones = 
            item.Telephones.length > 0 ?
              item.Telephones.map(row => row.Tel) : []
        }

        matchObj.inCollect = false

        return matchObj
      })

      return { message: "success", data: { ...result.data, data } }
    }

    return { message: res.statusText, data: undefined }
  }

  async single(itemID: string): Promise<{
    message: string,
    data: dataType
  }> {
    
    const res = await fetch(`https://proxy-service-three.vercel.app/test/hotels?i=${itemID}`)
    
    if (res.status === 200) {

      const result = await res.json()

      const data: dataType = Object.fromEntries(
        this.dataKeys.map(row => {

          const returnVals = {
            [row]: undefined,
            ParkingInfo: row === 'ParkingInfo' ? 
              result.data[row]
                .replace('車位:', '')
                .replace(/(\d+)/g, ' $1 ')
                .replace(/\s+/g, ' ')
                .trim() 
              : '',
            RoomInfo: row === 'RoomInfo' ? 
              Array.from(
                new Set(
                  result.data[row]
                    .split(";")
                    .filter(str => str !== "")
                    .map(roomRow => 
                      roomRow
                        .replace(/(\d+)/g, ' $1 ')
                        .replace(/\s+/g, ' ')
                        .trim()
                    )
                )
              ) : [],
            ServiceInfo: row === 'ServiceInfo' ? result.data[row].split(",").filter((str: string) => str !== "") : [],
            Telephones: row === 'Telephones' ? result.data[row].map(telRow => telRow.Tel) : []
          }[row]

          if(returnVals) return [row, returnVals]

          return [row, result.data[row]]
        })
      )

      data.inCollect = false

      return { message: "success", data }
    }
    
    return { message: res.statusText, data: {} as dataType }
  }
}
