import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedRouteAuthOnly from "./components/ProtectedRoute/ProtectedRouteAuthOnly";
import ProtectedRouteVerifyOnly from "./components/ProtectedRoute/ProtectedRouteVerifyOnly";
import Layout from "./pages/Layout/Layout";
import Item from "./pages/Item/Item";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ProfileEdit from "./pages/Mypage/Profile/ProfileEdit";
import EmailVerify from "./pages/Auth/EmailVerify";

const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={
						<ProtectedRouteVerifyOnly>
							<Item />
						</ProtectedRouteVerifyOnly>
					} />
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path="email-verify" element={
						<ProtectedRouteAuthOnly>
							<EmailVerify />
						</ProtectedRouteAuthOnly>
					} />
					<Route path="mypage">
						<Route path="profile" element={
							<ProtectedRoute>
								<ProfileEdit />
							</ProtectedRoute>
						} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;