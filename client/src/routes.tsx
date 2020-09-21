import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {Auth} from './pages/Auth';

import {CreateNote} from './pages/CreateNote';
import {Detail} from './pages/Detail';
import {Notes} from './pages/Notes';

export const useRoutes = (isAuthenticated: boolean): JSX.Element => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route exact path="/notes">
                    <Notes/>
                </Route>
                <Route exact path="/create">
                    <CreateNote/>
                </Route>
                <Route exact path="/detail/:id">
                    <Detail />
                </Route>
                <Redirect to="/notes" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
};
