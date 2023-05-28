import React, { useState, useEffect } from 'react';
import Subtotal from './Subtotal';
import Loading from './Loading';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import { grey } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useStateValue } from '../StateProvider';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40vh',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    icon: {
        color: '#3f51b5',
        marginRight: '.5rem',
    },
    headerText: {
        color: grey[700],
    },
    basketProduct: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productImage: {
        objectFit: 'contain',
        width: '100%',
    },
    infoBox: {
        color: grey[400],
        fontSize: ".7rem",
        maxWidth: 600,
    },
}));

function Checkout() {
    const classes = useStyles();
    const [loading, setloading] = useState(true);
    const [{ basket }, dispatch] = useStateValue();

    const deleteFromBasket = (index) => {
        dispatch({
            type: 'DELETE_FROM_BASKET',
            id: index,
        });
    };

    const addItem = (index) => {
        dispatch({
            type: 'ADD_ITEM',
            id: index,
        })
    };

    const deleteItem = (index) => {
        dispatch({
            type: 'REMOVE_ITEM',
            id: index,
        });
        for (let i = 0; i < basket.length; i++) {
            if (basket[i].id === index && basket[i].amount === 0) {
                deleteFromBasket(index);
            };
        };
    };

    const revealInfo = (item) => {
        // console.log(item);
    };

    useEffect(() => {
        setloading(false);
    }, []);

    return (
        <div style={{ padding: ".5rem" }}>
            {loading && (<Loading />)}

            <h1 style={{ textAlign: 'center' }}>
                <DonutSmallIcon className={classes.icon} />
                <span className={classes.headerText}>Shopping Basket</span>
            </h1>
            <div className={classes.container}>
                {basket?.length === 0 && (
                    <Typography variant="p" color="textSecondary" component="p" style={{ textAlign: 'center' }}>
                        Your shopping basket is empty. Add items through the Shoppo shop first.
                    </Typography>
                )}
                {basket?.length > 0 && (
                    <Paper elevation={3} style={{ padding: ".75rem", maxWidth: 1000 }} >
                        {basket.map(item => (
                            <div className={classes.basketProduct} key={item.id}>
                                <Paper elevation={1} style={{ width: 75, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={item.img} alt={item.title} className={classes.productImage} />
                                </Paper>
                                <h4 style={{ maxWidth: 600 }}>
                                    {item.title}<small> ({item.amount}x)</small><hr></hr>
                                    <p className={classes.infoBox}>{item.description}</p>
                                </h4>
                                <div>
                                    <Button variant="outlined" color="primary" size="small" onClick={() => deleteFromBasket(item.id)}>
                                        x
                            </Button>
                                    <Button variant="outlined" color="primary" size="small" onClick={() => deleteItem(item.id)}>
                                        -
                                </Button>
                                    <Button variant="outlined" color="primary" size="small" onClick={() => addItem(item.id)}>
                                        +
                            </Button>
                                </div>
                                <Typography variant="h6" color="textSecondary" component="p">
                                    £ {item.price}
                                </Typography>
                            </div>
                        ))}
                    </Paper>
                )}

                {basket?.length > 0 && (
                    <Subtotal />
                )}
            </div>
        </div>
    )
}

export default Checkout
