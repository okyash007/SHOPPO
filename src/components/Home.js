import React, { useState, useEffect } from 'react';
import Products from './Products';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Home() {

    const classes = useStyles();
    const [sort, setSort] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const changeSort = (e) => {
        setSort(e.target.value);
    };

    const filterFunction = (e) => {
        setFilterValue(e.target.innerText.toLowerCase())
    };

    return (
        <div>
            <div className={classes.root}>
                <ButtonGroup color="primary" size="small" aria-label="outlined primary button group">
                    <Button onClick={filterFunction}>Men Clothing</Button>
                    <Button onClick={filterFunction}>Women Clothing</Button>
                    <Button onClick={filterFunction}>Jewelery</Button>
                    <Button onClick={filterFunction}>Electronics</Button>
                </ButtonGroup>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">sort by</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        onChange={changeSort}
                    >
                        <MenuItem value={'ascending'}>price (low to high)</MenuItem>
                        <MenuItem value={'descending'}>price (high to low)</MenuItem>
                    </Select>
                </FormControl>
            </div>                
                <Products sort={sort} filterValue={filterValue} />
        </div>
    )
};

export default Home;
