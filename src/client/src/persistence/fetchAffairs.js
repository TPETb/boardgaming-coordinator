import axios from "axios";
import dayjs from "dayjs";

export const fetchAffairs = async ({ start = dayjs(new Date).subtract(7, "days"), end = dayjs(new Date).add(67, "days") } = {}) => {
    const data = (await axios.get('/affair', {
        params: {
            min_starts_at: start.toISOString(), max_starts_at: end.toISOString(),
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
