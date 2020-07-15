import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';

import Layout from './components/layout';

import Error404 from './pages/404';
import Error500 from './pages/500';
import Blog from './pages/blog';
import Contact from './pages/contact';
import Home from './pages/home';
import PostPage from './pages/postPage';

const App = () => (
    <Router>
        <Layout>
            <Switch>
                <Route path='/500'><Error500/></Route>
                <Route path='/blog' render={routeProps => <Blog {...routeProps}/>}/>
                <Route path='/contact'><Contact/></Route>
                <Route path='/post' render={routeProps => <PostPage {...routeProps}/>}/>
                <Route exact path={['/', '/index', '/home']} render={routeProps => <Home {...routeProps}/>}/>
                <Route><Error404/></Route>
            </Switch>
        </Layout>
    </Router>
);

export default App;
