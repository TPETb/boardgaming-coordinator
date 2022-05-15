import axios from "axios";

export const createGame = async ({ name }) => {
    return (await axios.post('/game', { name })).data;
}

export default createGame;
