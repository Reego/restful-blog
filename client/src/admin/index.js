import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { withAuthentication } from '../auth/auth';

import PostEditPanel from './postEditPanel';

const Admin = () => (
    <Switch>
        <Route path='/create'><PostEditPanel/></Route>
        <Route path='/edit'><PostEditPanel/></Route>
        <Route><Redirect to='/'/></Route>
    </Switch>
);

export default withAuthentication(Admin);
