import TreeViewer from './components/TreeViewer';
import { styled } from '@mui/system';

const MainContainer = styled('main')({
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "2rem"
});

function App() {
    return (
        <MainContainer id="content">
            <header>
                <h1>Natzka coding challenge</h1>
            </header>
            <TreeViewer />
        </MainContainer>
    );
}

export default App;
