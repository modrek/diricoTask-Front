import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CardMedia from "@material-ui/core/CardMedia";
import {
    Card,
    CardContent
} from "@material-ui/core";



const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #1f285a',

        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function AnimatedModal({ caption, alt, path, assetType }: { caption: string, alt: string, path: string, assetType: number }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let preview = null;
    if (assetType === 1) {
        preview = <CardMedia
            component="img"
            alt={alt}
            image={path}
            title=""
        />
    }
    else {
        preview = <Card >
            <div >
                <CardContent >
                    <iframe
                        id="video"
                        src={path}
                        frameBorder="0"
                        allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </CardContent>
            </div>
        </Card>

    }
    return (

        <div>

            <Button variant="contained" color="secondary" onClick={handleOpen}>
                {caption}
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2>preview Asset</h2>
                        {preview}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}