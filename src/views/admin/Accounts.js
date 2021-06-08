import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, IconButton, makeStyles, Tooltip } from '@material-ui/core'
import AccountCard from '../../components/AccountCard'
import AddCircleIcon from '@material-ui/icons/AddCircle';


const useStyles = makeStyles((theme) => {
    return {
        icon: {
            width: 80,
            height: 80,

        }
    }
})

export default function Accounts() {
    const [accounts, setAccounts] = useState([])
    const classes = useStyles();

    useEffect(() => {
        fetch('http://localhost:8000/accounts')
            .then(res => res.json())
            .then(data => setAccounts(data))
    }, [])

    const handleDelete = async (id) => {
        await fetch('http://localhost:8000/accounts' + id, {
            method: 'Delete'
        })
        //do not display deleted item
        const newAccounts = accounts.filter(account => account.id != id);
        setAccounts(newAccounts);
    }

    const handleEdit = async (id) => {
        await fetch('http://localhost:8000/accounts' + id, {
            method: 'PUT'
        })
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} justify={'flex-end'} >
                    <Tooltip
                        id="tool-tip-save"
                        title='Add Account'
                        placement='top'
                    >
                        <IconButton size={'small'}>
                            <AddCircleIcon className={classes.icon} color={'secondary'} />
                        </IconButton>
                    </Tooltip>
                </Grid>
                {accounts.map(account => (
                    <Grid item key={account.id} xs={12} sm={6} md={4}>
                        <AccountCard account={account} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
