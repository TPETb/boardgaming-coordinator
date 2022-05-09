import './App.css';
import MainScreen from './components/MainScreen';
import { RecoilRoot, } from 'recoil';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <RecoilRoot>
            <MainScreen></MainScreen>
        </RecoilRoot>
    );
}

export default App;
