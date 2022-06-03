import axios from "axios";

export const leaveAffair = async (id) => {
    return (await axios.delete('/participation/' + id));
}

export default leaveAffair;
