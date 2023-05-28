import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CurrencyFormat from 'react-currency-format';

import { useStateValue } from '../StateProvider';
import { makeStyles } from '@material-ui/core/styles';
import { getBasketTotal } from '../reducer';

const useStyles = makeStyles((theme) => ({
    subtotal: {
        padding: '0.75rem 2rem',
    },
    subtitle: {
        fontSize: '.7rem',
        maxWidth: 200,
    },
    subtitleLine: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

function Subtotal() {
    const classes = useStyles();
    const [{ basket }, dispatch] = useStateValue();

    return (
        <div>
            <Paper elevation={2} className={classes.subtotal}>
                <Typography variant="h6" color="textSecondary" component="h6" style={{ textAlign: 'center' }}>
                    Subtotal
                </Typography>
                <Typography variant="p" color="textSecondary" component="p" style={{ textAlign: 'center' }}>
                    {basket?.reduce((amount, item) => item.amount + amount, 0)} items
                </Typography>
                {basket.map(item => (
                    <div className={classes.subtitleLine}>
                        <Typography variant="subtitle" component="subtitle" className={classes.subtitle}>
                            {item.title}
                        </Typography>
                        <Typography variant="subtitle2" component="subtitle2" className={classes.subtitle}>
                <span style={{textAlign: 'right'}}>{item.amount}x</span> £ {item.price}
                        </Typography><br></br>
                    </div>
                ))}
                <hr></hr>
                <CurrencyFormat
                    renderText={(value) => (
                        <>
                            <p>
                                Subtotal ({basket?.reduce((amount, item) => item.amount + amount, 0)} items) : <strong>{` ${value}`}</strong>
                            </p>
                        </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    prefix={"£"}
                    thousandSeparator={true}
                    displayType="text"
                />
            </Paper>
        </div>
    )
}

export default Subtotal;
