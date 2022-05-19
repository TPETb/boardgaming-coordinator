import axios from "axios";

export const fetchAffairs = async ({ start, end }) => {
    const data = (await axios.get('/affair', {
        params: {
            min_starts_at: start.toISOString(),
            max_starts_at: end.toISOString(),
        }
    })).data;

    data.forEach((affairRaw) => {
        affairRaw.title = affairRaw.game.name;
        affairRaw.start = new Date(affairRaw.starts_at);
        affairRaw.end = new Date(affairRaw.ends_at);
    });

    return data;
}

export default fetchAffairs;
