import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';;
import image from "./../assets/img/skier.jpg";

/* style for the activity card */
const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        margin: 0

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    buttonGroup: {
        marginBottom: 25,
        marginRight: 25,
        marginLeft: 25,
        marginTop: 5,
    }

}));

/* activity cards come after the hero section */
export default function ActivityCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={image}
                title="Paella dish"
            />
            <CardHeader
                title="Ski"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>
            <CardActions >
                <Grid container align={"center"} className={classes.buttonGroup}>
                    <Grid item xs={6} align={"left"}>
                        <Button 
                        color='primary'
                        variant={"contained"}>
                            Private
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                        color='primary'
                        variant={"outlined"} 
                        align={"right"}>
                            Group
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
