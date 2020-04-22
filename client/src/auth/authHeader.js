import React from 'react';

import { useSelector } from 'react-redux';

const authHeader = ({ children }) => {

    const auth = useSelector(state => state.user);

    return (
        <React.Fragment>
            { auth &&
                (<div>Auth Header</div>)
            }
            { children }
        </React.Fragment>
    );
};

export default authHeader;
