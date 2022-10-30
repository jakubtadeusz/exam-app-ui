import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, TextField, MenuItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExaminedService from "../../services/ExaminedService";
import { useState, useEffect } from "react";
import "./ExaminedPage.css";

function ExaminedPage () {
    let examinedService = new ExaminedService();
    let [examined, setExamined] = useState([]);

    useEffect(() => {
        examinedService.getExamined().then((data) => {
            setExamined(data);
        });
    }, []);

    let removeExamined = (id) => {
        examinedService.removeExamined(id).then(() => {
            setExamined(examined.filter((m) => m.id !== id));
        });
    }

    let addExamined = (e) => {
        e.preventDefault();
        examinedService.addExamined({name: "Imię", surname: "Nazwisko", email: "email@mail.com", group: "Grupa"}).then((data) => {
            setExamined([...examined, data]);
        });
    }

    return (
        <div className="examined-page-content">
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Imię</TableCell>
                        <TableCell align="left">Nazwisko</TableCell>
                        <TableCell align="left">Adres email</TableCell>
                        <TableCell align="left">Grupa</TableCell>
                        <TableCell align="right"> </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody suppressContentEditableWarning={true}>
                    {examined.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        editable={true}
                        >
                        <TableCell suppressContentEditableWarning={true} contentEditable={true} component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell suppressContentEditableWarning={true} contentEditable={true} component="th" scope="row">
                            {row.surname}
                        </TableCell>
                        <TableCell suppressContentEditableWarning={true} contentEditable={true} component="th" scope="row">
                            {row.email}
                        </TableCell>
                        <TableCell suppressContentEditableWarning={true} contentEditable={true} component="th" scope="row">
                            {row.group}
                        </TableCell>
                        <TableCell align="right"><DeleteIcon color="secondary" onClick={() => removeExamined(row.id)}/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab 
            color="secondary" 
            aria-label="add" 
            className="add-examined-button"
            onClick={addExamined}>
                <AddIcon />
            </Fab>
        </div>
    );
}

export default ExaminedPage;