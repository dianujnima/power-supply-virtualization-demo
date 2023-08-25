import moment from 'moment';
import { SourceTypes } from '../interfaces/source-types.enum';
import { GraphDataSet } from '../interfaces/graph-data-set.interface';
import { DateTimeInterval } from './utils';
import { GetGraphDataFromApi } from './api';

const time_format: string = 'YYYY-MM-DD HH:mm:ss';
const date_format: string = 'YYYY-MM-DD';

export async function getGraphData(): Promise<{datasets: GraphDataSet[], dates: string[]}> {
  const data = await GetGraphDataFromApi();
  if(!data || !Array.isArray(data) || data.length === 0) {
    return {
      datasets: [],
      dates: []
    }
  }
  const start_date = data[0].date + ' 00:00:00';
  const end_date = data[data.length - 1].date + ' 23:59:59';
  const intervals = DateTimeInterval(start_date, end_date, time_format, 5, 'minutes');
  const dates = DateTimeInterval(start_date, end_date, date_format, 1, 'day');
  let datasets: null | GraphDataSet[] = null;
  
  data.forEach((_, index) => {
    data[index].minute_window = moment(data[index].minute_window).format(time_format);
  })

  const today_date = new Date().toDateString();

  intervals.forEach((interval) => {
    const int_date = moment(interval);
    const int_datetime = int_date.format(time_format);
    const int_time = int_date.format("HH:mm").toString();
    const date_for_graph = moment(today_date + " " + int_time);
    const date_for_graph_in_milliseconds = date_for_graph.format('x');
    const label = int_date.format('YYYY-MM-DD HH:mm');
    const duration = date_for_graph.add(5, 'minutes').format('x');
    let has_data = 0;
    let data_index: number | null = null;

    data.forEach((element, i) => {
      if (element.minute_window == int_datetime) {
        has_data = 1;
        data_index = i;
      }
    });
    
    const graphIndex = dates.findIndex((elem) => elem == int_date.format(date_format));
    let set: GraphDataSet = {
      name: "No Data",
      has_data: false,
      datetime: int_datetime,
      value: [graphIndex, Number(date_for_graph_in_milliseconds), Number(duration), label],
      itemStyle: {
        normal: {
          color: SourceTypes['']
        }
      }
    };

    if (has_data > 0 && data_index > 0) {
      const name = data[data_index].sourceTag;
      set.name = name;
      set.has_data = true;
      set.itemStyle.normal.color = SourceTypes[name];
    }
    if(datasets == null){
      datasets = [set];
    }else{
      datasets.push(set);
    }
  })
  return {datasets, dates};
}