import { atom, } from 'recoil';

const CurrentUserAtom = atom({
    key: 'CurrentUserAtom',
    default: null
})

export default CurrentUserAtom;
