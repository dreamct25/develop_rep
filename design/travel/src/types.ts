export interface travelDataType {
    AttractionID: string,
    AttractionName: string,
    AlternateNames: string[],
    Description: string
    PositionLat: number,
    PositionLon: number,
    Geometry: string | number,
    AttractionClasses: number[],
    PostalAddress?: {
        City: string,
        CityCode: string,
        Town: string,
        TownCode: string,
        ZipCode: string,
        StreetAddress: string
    },
    Telephones: { Tel: string }[],
    Images: {
        Name: string,
        Description: string,
        URL: string,
        Width: number | null,
        Height: number | null,
        Keywords: string[]
    }[],
    Organizations: string[],
    ServiceTimeInfo: {
        Name: string,
        Description: string | null,
        ServiceDays: string[],
        StartTime: string,
        StartTimeTransform: {
            hour: {
                time12h: number,
                time12hAt: string,
                time24h: number
            },
            minute: number,
            seconds: number
        },
        EndTime: string,
        EndTimeTransform: {
            hour: {
                time12h: number,
                time12hAt: string,
                time24h: number
            },
            minute: number,
            seconds: number
        },
        EffectiveDate: string | null,
        EffectiveDateTimeStamp: number | null,
        ExpireDate: string | null,
        ExpireDateTimeStamp: number | null
    }[],
    TrafficInfo: string,
    ParkingInfo: string,
    Facilities: string[],
    ServiceStatus: number,
    IsPublicAccess: number,
    IsAccessibleForFree: number,
    FeeInfo: string,
    PaymentMethods: string[],
    LocatedCities: string[],
    WebsiteURL: string,
    ReservationURLs: string[],
    MapURLs: string[],
    SameAsURLs: string[],
    SocialMediaURLs: {
        Name: string,
        Description: string | null,
        URL: string,
        Keywords: string[],
        Tags: string[]
    }[],
    VisitDuration: string | null,
    AssetsClass: string | null,
    SubAttractions: string[],
    PartOfAttraction: string | null,
    Tags: string[],
    Remarks: string,
    UpdateTime: string,
    TicketInfo: {
        Name: string,
        Price: number,
        Description: string | null,
        URL: string | null
    }[]
    Add: string
}

export interface fetchDataType {
    message: string,
    data: travelDataType[]
}