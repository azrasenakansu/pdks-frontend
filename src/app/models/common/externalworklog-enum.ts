import { StringValue } from "./string-value";

export enum ExternalWorklogType {
  OTHER = 0,
  HYBRID = 1,
  ASELSAN = 2,
}

export function stringValueToWorklogTypeEnum(str: StringValue | null | undefined) : ExternalWorklogType{
  if(str === null ||str === undefined){
    return ExternalWorklogType.OTHER;
  }
  switch(str.value){
    case "Hybrid" : return ExternalWorklogType.HYBRID;
    case "Aselsan" : return ExternalWorklogType.ASELSAN;
    default : return ExternalWorklogType.OTHER;
  }
}