export interface travelDataType {
    Add:string,
    Changetime:string,
    Class1:string,
    Class2:string,
    Class3:string,
    Description:string,
    Gov:string,
    Id:string,
    Keyword:string,
    Level:string,
    Map:string,
    Name:string,
    Opentime:string,
    Orgclass:string,
    Parkinginfo:string,
    Parkinginfo_Px:number,
    Parkinginfo_Py:number,
    Picdescribe1:string,
    Picdescribe2:string,
    Picdescribe3:string,
    Picture1:string,
    Picture2:string,
    Picture3:string,
    Px:number,
    Py:number,
    Region:string,
    Remarks:string,
    Tel:string,
    Ticketinfo:string,
    Toldescribe:string,
    Town:string,
    Travellinginfo:string,
    Website:string,
    Zipcode:string,
    Zone:string
}

export interface fetchDataType {
    XML_Head: {
        Infos: {
            Info: travelDataType[]
        }
    }
}