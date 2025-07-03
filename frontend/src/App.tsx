import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedRouteAuth from "./components/ProtectedRoute/ProtectedRouteAuth";
import ProtectedRouteVerify from "./components/ProtectedRoute/ProtectedRouteVerify";
import ProtectedRouteNoAuth from "./components/ProtectedRoute/ProtectedRouteNoAuth";
import Layout from "./pages/Layout/Layout";
import Item from "./pages/Item/Item";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ProfileEdit from "./pages/Mypage/Profile/ProfileEdit";
import EmailVerify from "./pages/Auth/EmailVerify";
import Mypage from "./pages/Mypage/Mypage";
import Sell from "./pages/Sell/Sell";
import ItemDetail from "./pages/ItemDetail/ItemDetail";
import Purchase from "./pages/Purchase/Purchase";

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
					<Route path="item/:id" element={
						<ProtectedRouteVerify>
							<ItemDetail />
						</ProtectedRouteVerify>
					} />
					<Route path="purchase/:id" element={
						<ProtectedRoute>
							<Purchase />
						</ProtectedRoute>
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
						<Route index element={<Mypage />} />
						<Route path="profile" element={
							<ProtectedRoute>
								<ProfileEdit />
							</ProtectedRoute>
						} />
					</Route>
					<Route path="sell" element={
						<ProtectedRoute>
							<Sell />
						</ProtectedRoute>
					} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;