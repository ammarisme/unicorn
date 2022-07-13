import React, {Component, Suspense, useState} from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import PrivateRoute from "./common/RouteRequiresLogin/RouteRequiresLogin";
import history from './history'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./common/layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./features/login/Login'))
const Register = React.lazy(() => import('./features/common_pages/register/Register'))
const Page404 = React.lazy(() => import('./features/common_pages/page404/Page404'))
const Page500 = React.lazy(() => import('./features/common_pages/page500/Page500'))

// if (!token){
//   return <Login setToken={setToken}></Login>
// }

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page"  history={history} element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path='*'  element={<PrivateRoute/>}>
              <Route exact path='*' element={<DefaultLayout />}/>
            </Route>
            {/*<Route path="*" name="Home" />*/}
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
