import axios from "axios";

export const joinAffair = async ({ affair, user }) => {
    return (await axios.post('/participation', { affair, user })).data;
}

export default joinAffair;
