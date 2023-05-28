import React, { useState, useEffect } from 'react';
import Loading from './Loading';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { indigo, deepOrange, grey, green } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useStateValue } from '../StateProvider';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 250,
        maxWidth: 300,
        margin: '1.5rem 2rem',
    },
    gridcontainer: {
        flexGrow: 1,
        justifyContent: 'center',
        margin: '5rem auto',
    },
    container: {
        justifyContent: 'center',
    },
    mediacontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    media: {
        width: '100%',
        objectFit: 'contain',
        maxHeight: 280,
        maxWidth: 250,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatarMC: {
        backgroundColor: indigo[300],
    },
    avatarWC: {
        backgroundColor: deepOrange[300],
    },
    avatarJW: {
        backgroundColor: grey[400],
    },
    avatarEL: {
        backgroundColor: green[400],
    }
}));

function Products({ sort, filterValue }) {
    const classes = useStyles();

    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [{ basket }, dispatch] = useStateValue();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addToBasket = (item) => {
            dispatch({
                type: 'ADD_TO_BASKET',
                item: {
                    id: item.id,
                    title: item.title,
                    img: item.image,
                    price: item.price,
                    description: item.description,
                    amount: 1
                }
            });
    };

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });            
    }, []);

    useEffect(() => {
        if (products) {
            products.forEach((item) => {
                item.amount = 0;
            });
        };
    }, [products]);

    switch (sort) {
        case 'ascending':
            products.sort((a, b) => (a.price < b.price) ? -1 : 1);
            break;
          case 'descending':
            products.sort((a, b) => (a.price > b.price) ? -1 : 1);
            break;
    };

    return (
        <>
            {loading && (<Loading />)}
            <div className={classes.gridcontainer} width={8 / 10}>
                <Grid container className={classes.container}>
                    {products && filterValue === '' && products.map(el => (
                        <Card className={classes.card} key={el.id} item>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="category" className={
                                        el.category === 'men clothing' ? classes.avatarMC :
                                            el.category === 'women clothing' ? classes.avatarWC :
                                                el.category === 'jewelery' ? classes.avatarJW :
                                                    el.category === 'electronics' ? classes.avatarEL : null
                                    }>
                                        <DonutSmallIcon />
                                    </Avatar>
                                }
                                title={el.title}
                                subheader={el.category}
                            />
                            <CardMedia className={classes.mediacontainer}>
                                <img src={el.image} alt={el.title} className={classes.media} key={el.id} />
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h6" color="textSecondary" component="p" size="big">
                                    £ {el.price}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button variant="contained" color="primary" size="small" onClick={() => addToBasket(el)}>
                                    + add to basket
                            </Button>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="more info"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {el.description}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    ))}

                    {/* TESTCODE */}
                    {products && filterValue && products.filter(item => item.category === filterValue).map(el => (
                        <Card className={classes.card} key={el.id} item>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="category" className={
                                        el.category === 'men clothing' ? classes.avatarMC :
                                            el.category === 'women clothing' ? classes.avatarWC :
                                                el.category === 'jewelery' ? classes.avatarJW :
                                                    el.category === 'electronics' ? classes.avatarEL : null
                                    }>
                                        <DonutSmallIcon />
                                    </Avatar>
                                }
                                title={el.title}
                                subheader={el.category}
                            />
                            <CardMedia className={classes.mediacontainer}>
                                <img src={el.image} alt={el.title} className={classes.media} key={el.id} />
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h6" color="textSecondary" component="p" size="big">
                                    £ {el.price}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button variant="contained" color="primary" size="small" onClick={() => addToBasket(el)}>
                                    + add to basket
                            </Button>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="more info"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {el.description}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    ))}
                </Grid>
            </div>
        </>
    )
}

export default Products;
