import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthenticatedRoute } from './components/Routes/AuthenticatedRoute'
import { SignIn } from './modules/Auth/pages/SignIn'
import { SignUp } from './modules/Auth/pages/SignUp'
import { CreateLink } from './modules/Dashboard/pages/CreateLink'
import { Home } from './modules/Dashboard/pages/Home'
import { Search } from './modules/Dashboard/pages/Search'
import { Trending } from './modules/Dashboard/pages/Trending'

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />

      <Route
        path="/dashboard/:page"
        element={
          <AuthenticatedRoute>
            <Home />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/top"
        element={
          <AuthenticatedRoute>
            <Trending />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <AuthenticatedRoute>
            <Search />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <AuthenticatedRoute>
            <CreateLink />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthenticatedRoute>
            <Navigate replace to="/dashboard/1" />
          </AuthenticatedRoute>
        }
      />
    </Routes>
  )
}

export default App
