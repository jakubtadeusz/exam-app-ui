import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, TextField, MenuItem } from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ExaminedService from "../../services/ExaminedService";
import { useState, useEffect } from "react";
import "./ExaminedPage.css";
import { useAuth } from "../../auth/Auth";

function ExaminedPage () {
    let examinedService = new ExaminedService();
    let [examined, setExamined] = useState([]);
    let auth = useAuth();

    useEffect(() => {
        examinedService.getExamined(auth.user.access_token).then((data) => {
            setExamined(data);
            console.log("data", data);
        });
    }, []);

    let removeExamined = (id) => {
        examinedService.removeExamined(auth.user.access_token, id).then(() => {
            setExamined(examined.filter((m) => m.id !== id));
        });
    }

    let addExamined = (e) => {
        e.preventDefault();
        examinedService.addExamined(auth.user.access_token, {
            name: "Imię", 
            surname: "Nazwisko", 
            email: "email@mail.com", 
            group: "Grupa"
        }).then((data) => {
            setExamined([...examined, data]);
        });
    }

    let saveExamined = (examined) => {
        examinedService.updateExamined(auth.user.access_token, examined).then((data) => {
        });
    }

    let columns = [
        { field: "name", headerName: "Imię", editable: true, flex: 1 },
        { field: "surname", headerName: "Nazwisko", editable: true, flex: 1 },
        { field: "email", headerName: "Adres email", editable: true, flex: 1 },
        { field: "group", headerName: "Grupa", editable: true, flex: 1 },
        { field: "save", headerName: "", editable: false, sortable: false, flex: 1,
        renderCell: (params) => {
            return (
                <SaveIcon color="secondary" onClick={() => saveExamined(params.row)}/>
                );
            }
        },
        { field: "delete", headerName: "", editable: false, sortable: false, flex: 1,
            renderCell: (params) => {
                return (
                    <DeleteIcon color="secondary" onClick={() => removeExamined(params.id)}/>
                );
             }
        }

    ];

    return (
        <div className="examined-page-content">
            <DataGrid
                rows={examined}
                columns={columns}
                useResizeContainer = {true}
                experimentalFeatures={{ newEditingApi: true }}
                editMode="row"
            />
            <Fab color="secondary" aria-label="add" className="add-examined-button" onClick={addExamined}>
                <AddIcon />
            </Fab>
        </div>
    );
}

export default ExaminedPage;