import moment from "moment";

export function DateTimeInterval(
    start_date: string,
    end_date: string,
    format: string = 'YYYY-MM-DD',
    interval: number = 1,
    interval_unit: moment.unitOfTime.DurationConstructor = "hours"
  ): string[] {
    const begin = moment(start_date),
    end = moment(end_date),
    data = [];
  
    for (let dt = begin; dt <= end; dt = moment(dt).add(interval, interval_unit)) {
      data.push(dt.format(format));
    }
    return data;
  }