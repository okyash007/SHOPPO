import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useStateValue } from '../StateProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    link: {
        ouline: 'none',
        border: 'none',
        color: 'inherit',
        textDecoration: 'none',
    },
    info: {
        textTransform: 'lowercase',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: '.95rem',
        opacity: .8,
    },
    logo: {
        margin: '0 .5rem',
    },
    counter: {
        margin: '0 0 .75rem .1rem',
        fontSize: '.75rem',
    },
}));


export default function Navbar() {
    const [{ basket, user }] = useStateValue();

    const classes = useStyles();
    const visible = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/" className={classes.link}>
                        <Button edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <DonutSmallIcon /><span className={classes.logo}>shoppo</span>
                        </Button>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        <small>{visible ? `webshop` : null}</small>
                    </Typography>
                    <Link to="/info" className={classes.link}>
                        <Button color="inherit" className={classes.info}>Info</Button>
                    </Link>
                    <Link to="/checkout" className={classes.link}>
                        <Button color="inherit">
                            <ShoppingCartIcon />
                            <span className={classes.counter}>{basket?.reduce((amount, item) => item.amount + amount, 0)}</span>
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}