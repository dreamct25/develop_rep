import { GetDataService } from '@/app/service'

export interface respDataType {
  HotelID: string
  HotelName: string
  Description: string
  Telephones: { Tel: string }[]
  PostalAddress: {
    City: string,
    CityCode: string,
    Town: string,
    TownCode: string,
    ZipCode: string,
    StreetAddress: string
  }
  AccessibilityRooms: number
  HotelClasses: number[]
  CeilingPrice: number
  LowestPrice: number
  ParkingInfo: string
  Images: {
    Name: string,
    Description: string,
    URL: string
  }[]
  PositionLon: number
  PositionLat: number
  ServiceInfo: string
  RoomInfo: string
}

export type dataType = {
  HotelID: string
  HotelName: string
  Description: string
  Telephones: string[]
  PostalAddress: {
    City: string,
    CityCode: string,
    Town: string,
    TownCode: string,
    ZipCode: string,
    StreetAddress: string
  }
  AccessibilityRooms: number
  HotelClasses: number[]
  CeilingPrice: number
  LowestPrice: number
  ParkingInfo: string
  Images: {
    Name: string,
    Description: string,
    URL: string
  }[]
  PositionLon: number
  PositionLat: number
  ServiceInfo: string[]
  RoomInfo: string[]
  inCollect: boolean
}

export type loactionType = {
    latitude: number,
    longitude: number
}

export type paginationType = {
  totalLength: number,
  partPage: number,
  pageTotal: number,
  pageTotalToArray: number[],
  currentPage: number,
  hasPrev: boolean,
  hasNext: boolean,
  pageSize: number
}

export type paginationReturnParams = {
  pageObj: paginationType,
  renderItem: dataType[]
}

export type paginationOptions = {
  pages: number | undefined,
  partPage: number,
  pageSize: number
}

export type selectType = {
  selectName: string,
  selectColumn: string,
  selectVals: string
}

export type modalContentType = {
  msTitle: string
  msContent: string
  msItem: { [key: string]: any }
}

export interface LocationModalContentType extends modalContentType {
  msItem: {
    detailsParams: {
      HotelName: string,
      Address: string
      PositionLon: number,
      PositionLat: number
    }
  }
}

export type GetAllDataParamsType = Parameters<GetDataService['datas']>[0]