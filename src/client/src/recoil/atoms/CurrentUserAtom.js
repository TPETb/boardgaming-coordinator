import { atom, } from 'recoil';

const CurrentUserAtom = atom({
    key: 'CurrentUserAtom',
    default: {
        role: 'Guest',
        name: '',
        loggedIn: false,
    }
})

export default CurrentUserAtom;
