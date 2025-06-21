import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedRouteAuth from "./components/ProtectedRoute/ProtectedRouteAuth";
import ProtectedRouteVerify from "./components/ProtectedRoute/ProtectedRouteVerifyOnly";
import ProtectedRouteNoAuth from "./components/ProtectedRoute/ProtectedRouteNoAuth";
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
						<ProtectedRouteVerify>
							<Item />
						</ProtectedRouteVerify>
					} />
					<Route path="register" element={
						<ProtectedRouteNoAuth>
							<Register />
						</ProtectedRouteNoAuth>
					} />
					<Route path="login" element={
						<ProtectedRouteNoAuth>
							<Login />
						</ProtectedRouteNoAuth>
					} />
					<Route path="email-verify" element={
						<ProtectedRouteAuth>
							<EmailVerify />
						</ProtectedRouteAuth>
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