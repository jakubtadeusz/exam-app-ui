import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, TextField, MenuItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageService from "../../services/MessageService";
import { useState, useEffect } from "react";
import "./MessagePage.css";

function MessagePage() {

    let messageService = new MessageService();
    let [messages, setMessages] = useState([]);

    useEffect(() => {
        messageService.getMessages().then((data) => {
            setMessages(data);
        });
    }, []);

    let addMessage = (e) => {
        e.preventDefault();
        messageService.addMessage({title: "Nowa wiadomość", content: "Treść nowej wiadomości"}).then((data) => {
            setMessages([...messages, data]);
        });
    }

    let handleMessageTypeChange = (e, message) => {
        message.type = e.target.value;
        messageService.updateMessage(message).then((data) => {
            setMessages(messages.map((m) => {
                if(m.id === data.id){
                    return data;
                }
                return m;
            }));
        });
    }

    let removeMessage = (id) => {
        messageService.removeMessage(id).then(() => {
            setMessages(messages.filter((m) => m.id !== id));
        });
    }


    return (
        <div className="message-page-content">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nazwa wiadomości</TableCell>
                        <TableCell align="left">Treść wiadomości</TableCell>
                        <TableCell align="right">Typ wiadomości</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody suppressContentEditableWarning={true}>
                    {messages.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        editable={true}
                        >
                        <TableCell suppressContentEditableWarning={true} contentEditable={true} component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell suppressContentEditableWarning={true} contentEditable={true} align="left" style={{whiteSpace: 'pre-line'}}>{row.content}</TableCell>
                        <TableCell align="right">
                            <TextField
                                value={row.type}
                                onChange={e => handleMessageTypeChange(e, row)}
                                select // tell TextField to render select
                                label="Typ wiadomości"
                                size="small"
                                >
                                <MenuItem value={"Zaproszenie"}>Zaproszenie</MenuItem>
                                <MenuItem value={"Ocena"}>Ocena</MenuItem>
                            </TextField>
                        </TableCell>
                        <TableCell align="right"><DeleteIcon color="secondary" onClick={() => removeMessage(row.id)}/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab 
            color="secondary" 
            aria-label="add" 
            className="add-message-button"
            onClick={addMessage}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default MessagePage;