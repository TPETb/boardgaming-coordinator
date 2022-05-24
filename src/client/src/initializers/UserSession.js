import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import axios from "axios";
import { setRecoil } from "recoil-nexus";

export const initUserSession = async ({ name, token, role }, verify = false, store = true) => {
    axios.defaults.headers.common['Authorization'] = token;

    if (verify) {
        // todo verify
    }

    if (store) {
        localStorage.setItem('user', JSON.stringify({ name, token, role }));
    }

    setRecoil(CurrentUserAtom, {
        name, role,
    });
};

export const initUserSessionFromLocalStorage = async () => {
    if (localStorage.getItem('user')) {
        try {
            await initUserSession(JSON.parse(localStorage.getItem('user')), true, false);
        } catch (e) {

        }
    }
};

export const destructUserSession = async () => {
    setRecoil(CurrentUserAtom, null);
    localStorage.removeItem('user');
};
