import { StringValue } from "./string-value";

export enum ExternalWorklogType {
  Diğer = 0,
  Hybrid = 1,
  Aselsan = 2,
}

export function externalWorklogTypeToString(value: ExternalWorklogType | null | undefined) : string {
  if(value === null || value === undefined){
    return "Diğer";
  }
  switch(value){
    case 1 : return "Hybrid";
    case 2 : return "Aselsan";
    default : return "Diğer";
  }
}

export function stringValueToWorklogTypeEnum(str: StringValue | null | undefined) : ExternalWorklogType{
  if(str === null ||str === undefined){
    return ExternalWorklogType.Diğer;
  }
  switch(str.value){
    case "Hybrid" : return ExternalWorklogType.Hybrid;
    case "Aselsan" : return ExternalWorklogType.Aselsan;
    default : return ExternalWorklogType.Diğer;
  }
}

export function externalWorklogTypeFromValue(value: number | null | undefined) : ExternalWorklogType{
  if(value === null || value === undefined){
    return ExternalWorklogType.Diğer;
  }
  switch(value){
    case 1 : return ExternalWorklogType.Hybrid;
    case 2 : return ExternalWorklogType.Aselsan;
    default : return ExternalWorklogType.Diğer;
  }
}