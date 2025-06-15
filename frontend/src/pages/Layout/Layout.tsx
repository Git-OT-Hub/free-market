import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import "../../styles/sanitize.css";
import Header from "../../components/Header/Header";
import store from "../../store/store";
import FlashMessage from "../../components/FlashMessage/FlashMessage";

const Layout: React.FC = () => {
    return (
        <Provider store={store}>
            <Header />
            <FlashMessage />
            <Outlet />
        </Provider>
    );
}

export default Layout;