import React from "react";
import { useState, useEffect } from "react";
import UserHeader from "./UserHeader";
import "./ExamList.css";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ExamService from "../services/ExamService";

function ExamList(props) {

    let examService = new ExamService();
    let [exams, setExams] = useState([]);



    useEffect(() => {
        examService.getExams().then((data) => {
            setExams(data);
        });
    }, []);

    let parseStatus = (status) => {
        switch(status){
            case "Nierozpoczęty": return <div style={{color: 'rgba(0, 0, 0, 0.87)'}}>{status}</div>;
            case "W trakcie": return <div style={{color: 'rgba(0, 123, 255, 1)'}}>{status}</div>;
            case "Do oceny": return <div style={{color: 'rgba(220, 53, 69, 1)'}}>{status}</div>;
            case "Zakończony": return <div style={{color: 'rgba(40, 167, 69, 1)'}}>{status}</div>;
        }
    }

    return (
        <div id="exam-list">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nazwa egzaminu</TableCell>
                        <TableCell align="right">Utworzony</TableCell>
                        <TableCell align="center">Termin egzaminu</TableCell>
                        <TableCell align="center">Czas trwania</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {exams.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        hover={true}
                        onClick={() => 
                            {
                                props.setSelectedExam({id: row.id, name: row.name});
                                props.changeToEdit();
                            }
                        }
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.created.toDateString()}</TableCell>
                        <TableCell align="center">{row.examTime.toLocaleString()}</TableCell>
                        <TableCell align="center">{row.examDuration}min</TableCell>
                        <TableCell align="center">{parseStatus(row.status)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab 
            color="secondary" 
            aria-label="add" 
            className="add-exam-button"
            onClick={
                () => {
                    props.setSelectedExam(null);
                    props.changeToEdit();
                }
            }>
                <AddIcon />
            </Fab>
        </div>
    );
}

export default ExamList;

