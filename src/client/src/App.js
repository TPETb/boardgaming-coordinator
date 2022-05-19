import './App.css';
import MainScreen from './components/MainScreen';
import { RecoilRoot, useRecoilState, } from 'recoil';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AvailableGamesAtom from "./recoil/atoms/AvailableGamesAtom";
import fetchGames from "./persistence/fetchGames";

function App() {
    const [games, setGames] = useRecoilState(AvailableGamesAtom);

    const [booting, setBooting] = useState(false);
    const [booted, setBooted] = useState(false);

    useEffect(async () => {
        if (booting || booted) {
            return;
        }

        setBooting(true);

        axios.defaults.withCredentials = true;
        axios.defaults.baseURL = '/api';

        setGames(await fetchGames());
        setBooted(true);
        setBooting(false);
    });

    return (
        <>
            {booted && (<MainScreen/>)}
        </>
    );
}

export default App;
