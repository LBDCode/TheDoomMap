import React from 'react';
import { Grid, withStyles, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined';
import { Link } from "react-router-dom";
import heroOverlay from '../pages/landing.PNG';
import Icon from '@mdi/react'
import { mdiHomeFlood, mdiAlienOutline, mdiWeatherHurricane, mdiFire } from '@mdi/js'

const styles = theme => ({
    root: {
        position: 'absolute',
        width: '100%',
        top: '90px',
        height: 'calc(100vh - 90px)',
        backgroundColor: '#111',
    },
    appbar: {
        height: '30px',
        minHeight: '30px',
        width: '100%',
        backgroundColor: '#fff',
        color: '#6c757d'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        height: '60vh',
        minHeight: '360px',
        maxHeight: '600px',
        marginTop: '60px',
        backgroundColor: '#212529',
        padding: '8% 20% 20% 5%',
        paddingBottom: '140px!important',
        position: 'relative',
        zIndex: '3000',
        textAlign: 'right',
        '&::after': {
            content: "''",
            backgroundImage: `url(${heroOverlay})`,
            backgroundSize: 'cover',
            position: 'absolute',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
            opacity: '0.21',
            zIndex: '3000',
        }
    },
    heroTextLarge: {
        color: "#fff!important",
        fontWeight: '700!important',
        fontSize: '2.3rem!important'
    },
    heroTextSmall: {
        color: "#fff!important",
        fontSize: '1.5rem!important'
    },
    heroButton:
    {
        marginTop: '40px',
        marginRight: '50px',
        zIndex: '10000',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: '1.7rem',
        padding: '8px 18px',
        border: '2px solid',
        lineHeight: 1.5,
        backgroundColor: '#ff630700',
        borderColor: '#d0550d',
        color: '#d0550d',
        '&:hover': {
            backgroundColor: '#d0550d',
            borderColor: '#d0550d',
            boxShadow: 'none',
            color: '#fff'
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#d0550d',
            borderColor: '#d0550d',
            color: '#fff'

        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
            color: '#fff'
        },
    },
    heroImages: {
        display: 'flex',
        paddingLeft: '120px',
        [theme.breakpoints.down("md")]: {
            paddingLeft: '40px'
        },
        [theme.breakpoints.down("md")]: {
            paddingLeft: '20px'
        },
    },
    heroImageLeft: {
        flexGrow: 1,
        height: '220px',
        width: '250px',
        maxWidth: '350px',
        minWidth: '150px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    heroImageRight: {
        flexGrow: 1,
        height: '220px',
        width: '250px',
        marginTop: '80px',
        marginLeft: '-130px',
        maxWidth: '350px',
        minWidth: '150px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    cardGrid: {
        height: '30vh',
        paddingTop: theme.spacing(8),
        paddingBottom: '100px',
        backgroundColor: '#212529',
    },
    iconGrid: {
        marginTop: '40px'
    },
    iconGridItem: {
        textAlign: 'center!important'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0!important',
        padding: '15px!important',
    },
    cardDiv: {
        width: '100%',
        marginTop: '-150px',
        paddingLeft: '60px',
        paddingRight: '60px',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        height: '180px',
        margin: '5px',
    },
    cardContent: {
        flexGrow: 1,
        marginLeft: '10px',
        textAlign: 'center',
    },
    cardIcon: {
        margin: '0 auto',
        color: "#fff",
        fontSize: '2.5rem',
        [theme.breakpoints.down("lg")]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.down("md")]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '1.3rem',
        },
    },
    cardTitle: {
        color: "#222",
        fontSize: '1.2rem',
        fontWeight: '600',
        [theme.breakpoints.down("lg")]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down("md")]: {
            fontSize: '.7rem',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '.8rem',
        },
    },
    cardText: {
        fontSize: '.9rem',
        [theme.breakpoints.down("lg")]: {
            fontSize: '.8rem',
        },
        [theme.breakpoints.down("md")]: {
            fontSize: '.7rem',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '.8rem',
        },
    },
    footer: {
        backgroundColor: '#343a40',
        padding: theme.spacing(4),
        bottom: '0',
        position: 'absolute',
        width: '100%',
    }

});

const Home = (props) => {

    const { classes } = props;

    return (
        <div className={classes.root}>
            <Container maxWidth={false} className={classes.heroContent}>
                <Typography className={classes.heroTextLarge} variant="h5" align="right" paragraph>
                    So, what's dooming the United
                    </Typography>
                <Typography className={classes.heroTextLarge} variant="h5" align="right" paragraph>
                    States today?
                    </Typography>
                <Button variant="outlined" className={classes.heroButton} href="/map">
                    Let's find out!
                </Button>
               
            </Container>
            <Container maxWidth={false} className={classes.iconGrid}>
                <Grid container spacing={4}>
                    <Grid item key={1} xs={3} className={classes.iconGridItem}>
                        <Icon path={mdiFire}
                            size={'3.8rem'}
                            color="#495057" />
                    </Grid>
                    <Grid item key={2} xs={3} className={classes.iconGridItem}>
                        <Icon path={mdiWeatherHurricane}
                            size={'3.8rem'}
                            color="#495057" />
                    </Grid>
                    <Grid item key={3} xs={3} className={classes.iconGridItem}>
                        <Icon path={mdiHomeFlood}
                            size={'3.8rem'}
                            color="#495057" />
                    </Grid>
                    <Grid item key={4} xs={3} className={classes.iconGridItem}>
                        <Icon path={mdiAlienOutline}
                            size={'3.8rem'}
                            color="#495057" />
                    </Grid>
                </Grid>
            </Container>

        </div>

    );

}

export default withStyles(styles)(Home);
