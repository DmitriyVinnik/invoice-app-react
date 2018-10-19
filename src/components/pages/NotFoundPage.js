import React from 'react';

const NotFoundPage = (props) => {
    const {location} = props;

    return (
        <div>
            <h3>
                404 - Not found!
            </h3>
            <p>
                No match for <code>{location.pathname}</code>
            </p>
        </div>
    );
};

export default NotFoundPage;
