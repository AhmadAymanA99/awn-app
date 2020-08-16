import React from 'react'
import { Provider } from 'react-redux'
import store from "../redux/store"
import './style/App.css'
import './style/landingPage.scss'
import LandingPage from './LandingPage'
import DonationPage from './DonationPage'
import VolunteeringPage from './VolunteeringPage'
import RecyclingPage from './RecyclingPage'
import AdminContainer from './AdminContainer'
import SearchPagePosts from './SearchPagePosts'
import RegisterContainer from './RegisterContainer'
import UserProfileContainer from './UserProfileContainer'
import AdminLoginContainer from './AdminLoginContainer'
import PostPage from './PostPage'
import CreatePostContainer from './CreatePostContainer'
import About from './About'
import Confirmation from './Confirmation'
import EditPost from './EditPost'
import NavBar from './NavBar'
import Footer from './Footer'

import { Route, Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'



function App() {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div id="bodyHolder">
            <Switch>     
              <Route exact path='/search' component={SearchPagePosts} />
              <Route exact path='/posts' component={PostPage} />
              <Route exact path='/email/confirmation/:id/:token' component={Confirmation} />
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/register' component={RegisterContainer} />
              <Route exact path='/search' component={SearchPagePosts} />
              <Route exact path='/volunteering' component={VolunteeringPage} />
              <Route exact path='/donations' component={DonationPage} />
              <Route exact path='/recycling' component={RecyclingPage} />
              <Route exact path='/admin/login' component={AdminLoginContainer} />
              <Route exact path='/admin/page' component={AdminContainer} />
              <Route exact path='/user/:id' component={UserProfileContainer} />
              <Route exact path='/post/:id' component={PostPage} />
              <Route exact path='/createpost' component={CreatePostContainer} />
              <Route exact path='/about' component={About} />
              <Route exact path='/EditPost' component={EditPost} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
