import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useRecoilState, } from 'recoil';
import axios from "axios";
import fetchGames from "./persistence/fetchGames";
import MainScreen from './components/MainScreen';
import AvailableGamesAtom from "./recoil/atoms/AvailableGamesAtom";
import { initUserSessionFromLocalStorage } from "./initializers/UserSession";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import fetchAffairs from "./persistence/fetchAffairs";
import dayjs from "dayjs";
import VisibleAffairsAtom from "./recoil/atoms/VisibleAffairsAtom";
import { Settings } from 'luxon';

Settings.defaultZone = 'system';

function App() {
    const [games, setGames] = useRecoilState(AvailableGamesAtom);
    const [affairs, setAffairs] = useRecoilState(VisibleAffairsAtom);

    const [booting, setBooting] = useState(false);
    const [booted, setBooted] = useState(false);

    useEffect(async () => {
        if (booting || booted) {
            return;
        }

        setBooting(true);

        axios.defaults.withCredentials = true;
        axios.defaults.baseURL = '/api';

        await initUserSessionFromLocalStorage();

        const [games, affairs] = await Promise.all([
            fetchGames(),
            fetchAffairs({
                start: dayjs(new Date).subtract(7, "days"),
                end: dayjs(new Date).add(67, "days"),
            })
        ]);

        setGames(games);
        setAffairs(affairs);

        setBooted(true);
        setBooting(false);
    });

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
                {booted && (<MainScreen />)}
            </LocalizationProvider>
        </>
    );
}

export default App;
