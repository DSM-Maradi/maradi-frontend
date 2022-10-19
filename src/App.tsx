import StyleProvider from "./styles";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./components/main";
import MyPage from "./components/mypage";

const App = () => {
  return (
    <StyleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </StyleProvider>
  );
};

export default App;
