import axios from 'axios';
import {type Article} from './models';

const apiUrl = "https://newssearcherpyapi.rmccrear.repl.co/opposing_view";

export const getOpp = async (name: string, description: string, sentiment: string) => {
    const resp = await axios.post<Article[]>(apiUrl, {
        name,
        description,
        sentiment
    });
    return resp.data;
}