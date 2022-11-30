import React from "react";
import { Paper, Fab, TextField, MenuItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import MessageService from "../../services/MessageService";
import { useState, useEffect } from "react";
import "./MessagePage.css";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../../auth/Auth";
import { useGridApiContext } from "@mui/x-data-grid-pro";
import {Popper} from "@mui/material";
import {InputBase} from "@mui/material";

function MessagePage() {

    let messageService = new MessageService();
    let [messages, setMessages] = useState([]);

    let auth = useAuth();

    useEffect(() => {
        messageService.getMessages(auth.user.access_token).then((data) => {
            setMessages(data);
            console.log("data", data);
        });
    }, []);

    let removeMessage = (id) => {
        messageService.removeMessage(auth.user.access_token, id).then(() => {
            setMessages(messages.filter((m) => m.id !== id));
        });
    }

    let addMessage = (e) => {
        e.preventDefault();
        messageService.addMessage(auth.user.access_token, {
            name: "Nazwa wiadomości", 
            content: "Treść wiadomości", 
            type: "Zaproszenie"
        }).then((data) => {
            setMessages([...messages, data]);
        });
    }

    let saveMessage = (message) => {
        messageService.updateMessage(auth.user.access_token, message).then((data) => {
        });
    }

    let handleMessageTypeChange = (event, message) => {
        message.type = event.target.value;
        var newMessages = messages.map((m) => {
            if (m.id === message.id) {
                return message;
            }
            return m;
        });
        setMessages(newMessages);
    }

    const EditTextArea = (props) => {
        const { id, field, value, colDef } = props;
        const [valueState, setValueState] = React.useState(value);
        const [anchorEl, setAnchorEl] = React.useState();
        const apiRef = useGridApiContext();
      
        const handleRef = React.useCallback((el) => {
          setAnchorEl(el);
        }, []);
      
        const handleChange = React.useCallback(
          (event) => {
            const newValue = event.target.value;
            setValueState(newValue);
            apiRef.current.setEditCellValue(
              { id, field, value: newValue, debounceMs: 200 },
              event,
            );
          },
          [apiRef, field, id],
        );
      
        const handleKeyDown = React.useCallback(
          (event) => {
            if (
              event.key === 'Escape' ||
              (event.key === 'Enter' &&
                !event.shiftKey &&
                (event.ctrlKey || event.metaKey))
            ) {
              const params = apiRef.current.getCellParams(id, field);
              apiRef.current.publishEvent('cellKeyDown', params, event);
            }
          },
          [apiRef, id, field],
        );
      
        return (
          <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
            <div
              ref={handleRef}
              style={{
                height: 1,
                width: colDef.computedWidth,
                display: 'block',
                position: 'absolute',
                top: 0,
              }}
            />
            {anchorEl && (
              <Popper open anchorEl={anchorEl} placement="bottom-start">
                <Paper elevation={1} sx={{ p: 1, minWidth: colDef.computedWidth }}>
                  <InputBase
                    multiline
                    rows={4}
                    value={valueState}
                    sx={{ textarea: { resize: 'both' }, width: '100%' }}
                    onChange={handleChange}
                    autoFocus
                    onKeyDown={handleKeyDown}
                  />
                </Paper>
              </Popper>
            )}
          </div>
        );
      };

    const multilineColumn = {   
        type: 'string',
        renderEditCell: (params) => <EditTextArea {...params} />,
      };

    let columns = [
        { field: "name", headerName: "Nazwa wiadomości", editable: true, flex: 1 },
        { field: "content", headerName: "Treść wiadomości", editable: true, flex: 1, ...multilineColumn },
        { field: "type", headerName: "Typ wiadomości", false: true, flex: 1 ,
            renderCell: (params) => {
                return (
                    <TextField
                        select
                        value={params.row.type}
                        onChange={(e) => handleMessageTypeChange(e, params.row)}
                        variant="standard"
                        size="small"
                        style={{whiteSpace: 'pre-line'}}
                        fullWidth
                    >
                        <MenuItem value={"Zaproszenie"}>Zaproszenie</MenuItem>
                        <MenuItem value={"Ocena"}>Ocena</MenuItem>
                    </TextField>
                );
            }
            },
        { field: "save", headerName: "", editable: false, sortable: false, flex: 1,
        renderCell: (params) => {
            return (
                <SaveIcon color="secondary" onClick={() => saveMessage(params.row)}/>
                );
            }
        },
        { field: "delete", headerName: "", editable: false, sortable: false, flex: 1,
            renderCell: (params) => {
                return (
                    <DeleteIcon color="secondary" onClick={() => removeMessage(params.id)}/>
                );
             }
        }

    ];


    return (
        <div className="message-page-content">
            <DataGrid
                rows={messages}
                columns={columns}
                useResizeContainer = {true}
                experimentalFeatures={{ newEditingApi: true }}
                editMode="row"
            />
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