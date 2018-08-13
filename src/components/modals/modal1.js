import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

let initRooms = [
        {
            type: 'Twin',
            quantity: 22
        },
        {
            type: 'Triple',
            quantity: 12
        },
        {
            type: 'Quadro',
            quantity: 4
        }
    ];

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        marginTop: 0,
        height: 50
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 40,
    },
});

class SimpleModal extends React.Component {

    state = {
        open: false,
        rooms: Object.assign([], initRooms),
    };

    rooms = [];

    roomTypes = [
        'Twin',
        'Triple',
        'Quadro'
    ];

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ rooms: Object.assign([], initRooms), });
        this.setState({ open: false });
    };

    saveData = () => {
        initRooms = Object.assign([], this.state.rooms);
        this.setState({ open: false });
    };

    addField = () => {
        this.rooms = this.state.rooms;
        this.rooms.push({
            type: '',
            quantity: ''
        });
        this.setState({rooms: this.rooms});
    };

    handleChangeSelect = index => event => {
        this.rooms = this.state.rooms;
        this.rooms[index].type = event.target.value;
        this.setState({
            rooms: this.rooms,
        });
    };

    handleChangeInput = index => event => {
        this.rooms = this.state.rooms;
        this.rooms[index].quantity = event.target.value;
        this.setState({
            rooms: this.rooms
        });
    };

    deleteField = index => () => {
        this.rooms = this.state.rooms;
        this.rooms.splice(index, 1);
        this.setState({rooms: this.rooms});
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant={"contained"} color={"primary"} onClick={this.handleOpen} style={{marginTop: '20px'}}>Open Modal</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper} >
                        <Typography variant="title" id="modal-title" style={{background: '#eee', height: '28px', marginBottom: '15px', borderTopLeftRadius: '8px', borderTopRightRadius: '5px', padding: '15px'}}>
                            Структура номеров
                            <IconButton onClick={this.handleClose} style={{ float: 'right', color: 'black', marginTop: '-10px' }}>
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                        <div>
                            {this.state.rooms.map( (room, index) =>
                                <div style={{display: 'flex'}} room={room} key={index} index={index}>
                                    <form className={classes.root} autoComplete="off">
                                        <FormControl className={classes.formControl}>
                                            <Select
                                            value={room.type}
                                            onChange={this.handleChangeSelect(index)}
                                            >
                                             {this.roomTypes.map( (type, index) => <MenuItem value={type} key={index}>{type}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl} style={{minWidth: '50px'}}>
                                            <TextField
                                            id="number"
                                            value={room.quantity}
                                            onChange={this.handleChangeInput(index)}
                                            type="number"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                             }}
                                            />
                                        </FormControl>
                                    </form>
                                    <IconButton color="secondary" style={{marginTop: '-10px', width: '40px', height: '40px'}}>
                                        <CloseIcon onClick={this.deleteField(index)}/>
                                    </IconButton>
                                </div> )}
                            </div>
                        <div>
                            <Button variant={"text"} color={"primary"} onClick={this.addField} style={{margin: '10px 0'}}>Добавить</Button>
                        </div>
                        <Button variant={"contained"} color={"primary"} onClick={this.saveData}>Сохранить</Button>
                        <Button variant={"text"} style={{marginLeft: '10px'}} onClick={this.handleClose}>Отмена</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;