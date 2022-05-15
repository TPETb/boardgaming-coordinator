import axios from "axios";

export const createAffair = async ({ gameName, slots, comment, start }) => {
    return (await axios.post('/affair', {
        gameName, slots, comment, start
    })).data;
}

export default createAffair;
