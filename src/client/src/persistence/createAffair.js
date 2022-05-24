import axios from "axios";

export const createAffair = async ({ gameName, slots, comment, start }) => {
    const affairRaw = (await axios.post('/affair', {
        gameName,
        slots,
        comment,
        start: start.toSeconds()
    })).data;

    affairRaw.title = affairRaw.game.name;
    affairRaw.start = new Date(affairRaw.starts_at);
    affairRaw.end = new Date(affairRaw.ends_at);

    return affairRaw;
}

export default createAffair;
