import { Navigate, Route, Routes } from 'react-router-dom'
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

      <Route path="/dashboard/:page" element={<Home />} />
      <Route path="/top" element={<Trending />} />
      <Route path="/search" element={<Search />} />
      <Route path="/create" element={<CreateLink />} />
      <Route
        path="/dashboard"
        element={<Navigate replace to="/dashboard/1" />}
      />
    </Routes>
  )
}

export default App
