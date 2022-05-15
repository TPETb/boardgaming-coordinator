import axios from "axios";

export const fetchGames = async () => {
    return (await axios.get('/game')).data;
}

export default fetchGames;
