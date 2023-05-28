import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';

import DonutSmallIcon from '@material-ui/icons/DonutSmall';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40vh',
    },
    icon: {
        color: '#3f51b5'
    },
}));

function Loading() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DonutSmallIcon className={classes.icon} style={{fontSize: "40"}} />
            <span className={classes.icon} style={{opacity: '.8'}}>Shoppo is loading...</span>
        </div>
    )
}

export default Loading;
