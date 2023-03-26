import axios from 'axios';
import {type Article} from './models';

const apiUrl: string =  process.env.NEXT_PUBLIC_API_SERVER;

export const getOpp = async (name: string, description: string, sentiment: string, url: string) => {
    console.log("url: " + url);
    const resp = await axios.post<Article[]>(apiUrl + "/opposing_view", {
        name,
        description,
        sentiment,
        url
    });
    return resp.data;
}