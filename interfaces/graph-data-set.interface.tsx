import { SourceTypes } from "./source-types.enum"

export interface GraphDataSet{
  name: string,
  has_data: boolean,
  datetime: string,
  value: any[],
  itemStyle: {
    normal: {
      color: SourceTypes
    }
  }
}