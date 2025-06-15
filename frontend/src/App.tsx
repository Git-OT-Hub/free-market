import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Item from "./pages/Item/Item";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ProfileEdit from "./pages/Mypage/Profile/ProfileEdit";

const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Item />} />
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path="mypage">
						<Route path="profile" element={<ProfileEdit />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;