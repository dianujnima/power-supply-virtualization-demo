import { ApiDataSet } from "../interfaces/api-data-set.interface";

export async function GetGraphDataFromApi(): Promise<ApiDataSet[] | null> {
    const res = await fetch(process.env.API_URL ?? 'http://api.thunder.softoo.co/vis/api/dashboard/ssu/fixed');
    const repo = await res.json();
    if (repo.status == 'success') {
        return repo.data;
    }
    return null;
}