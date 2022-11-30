import React from "react";
import { useState, useEffect } from "react";
import ExamService from "../services/ExamService";
import { Button, Divider, TextField, Select, MenuItem } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import SendIcon from '@mui/icons-material/Send';
import FlagIcon from '@mui/icons-material/Flag';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, FormControlLabel } from '@mui/material';
import './EditExam.css';
import { useAuth } from "../auth/Auth";
import MessageService from "../services/MessageService";
import ExaminedService from "../services/ExaminedService";


function EditExam (props){
    let examService = new ExamService();
    let messageService = new MessageService();
    let examinedService = new ExaminedService();

    let auth = useAuth();
    let [exam, setExam] = useState({
        id: -1,
        name: "Nazwa egzaminu",
        created: Date.now(),
        examTime: Date.now(),
        examDuration: 90,
        status: "Nierozpoczęty",
    });

    let [gradeMessage, setGradeMessage] = useState("");
    let [examNameEdited, setExamNameEdited] = useState(false);
    let [examinedGroup, setExaminedGroup] = useState("");
    let [startMessage, setStartMessage] = useState("");

    let [gradeMessages, setGradeMessages] = useState([]);
    let [startMessages, setStartMessages] = useState([]);

    let [groups, setGroups] = useState([]);

    useEffect(() => {
        if (props.exam.id !== null){
            examService.getExam(props.exam.id).then((exam) => {
                setExam(exam);
            });
            messageService.getMessages(auth.user.access_token).then((data) => {
                console.log(data);
                setGradeMessages(data.filter((m) => m.type === "Ocena"));
                setStartMessages(data.filter((m) => m.type === "Zaproszenie"));
                setGradeMessage(data.filter((m) => m.type === "Ocena")[0].id);
                setStartMessage(data.filter((m) => m.type === "Zaproszenie")[0].id);
            });
            examinedService.getExaminedGroups(auth.user.access_token).then((data) => {
                console.log(data);
                setGroups(data);
                setExaminedGroup(0);
            });
        }
    }, [props.examId]);

    let setExamName = (value) => {
        var newExam = {...exam};
        newExam.name = value;
        setExam(newExam);
    }

    let setExamTime = (value) => {
        console.log(value);
        var newExam = {...exam};
        newExam.examTime = value;
        setExam(newExam);
    }

    let setExamDuration = (value) => {
        var newExam = {...exam};
        newExam.examDuration = value;
        setExam(newExam);
    }

    let parseStatus = (status) => {
        switch(status){
            case "Nierozpoczęty": return <div style={{color: 'rgba(0, 0, 0, 0.87)'}}>{status}</div>;
            case "W trakcie": return <div style={{color: 'rgba(0, 123, 255, 1)'}}>{status}</div>;
            case "Do oceny": return <div style={{color: 'rgba(220, 53, 69, 1)'}}>{status}</div>;
            case "Zakończony": return <div style={{color: 'rgba(40, 167, 69, 1)'}}>{status}</div>;
        }
    }

    let handleGradeMessageChange = (event) => {
        setGradeMessage(event.target.value);
    }

    let handleExaminedGroupChange = (event) => {
        setExaminedGroup(event.target.value);
    }

    let handleStartMessageChange = (event) => {
        setStartMessage(event.target.value);
    }

    let beginExam = () => {
        examService.beginExam(auth.user.access_token, exam.id).then((exam) => {
        });
    }

    let sendGrades = () => {
        messageService.sendGrades(auth.user.access_token, gradeMessage, exam.id, groups[examinedGroup]).then((exam) => {
        });
    }

    let sendInvitations = () => {
        messageService.sendInvitations(auth.user.access_token, startMessage, exam.id, groups[examinedGroup]).then((exam) => {
        });
    }

    return (
        <div className="exam-edit-container">
            <Button variant="contained" onClick={() => props.setSelected(0)}><ArrowBackIcon/>Wróć do listy egzaminów</Button>
            <div className="exam-edit-header">
                    {examNameEdited ? 
                    <TextField id="outlined" label="Email" variant="outlined" value={exam.name} onChange={e => setExamName(e.target.value)} sx={{ mb: '32px'}} onBlur={() => setExamNameEdited(false)}/>
                    : 
                    <div className="exam-name">{exam.name}</div>}
                <div className="exam-name-edit" onClick = {() => setExamNameEdited(true)}>edytuj</div>
                <div className="status-container">
                    <h3>Status:</h3>
                    <div className="status">{parseStatus(exam.status)}</div>
                </div>
            </div>
            <Divider/>
                <div className="exam-edit-times">
                    <div className="exam-edit-time">
                        <h3>Termin egzaminu: </h3>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} size="small"/>}
                                value={exam.examTime}
                                format="dd/MM/yyyy h:MM"
                                onChange={(newValue) => {
                                setExamTime(newValue.toDate().toISOString());
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="exam-edits">
                    <h3>Czas trwania egzaminu: </h3>
                    <TextField id="outlined" size="small" type="number" variant="outlined" value={exam.examDuration} onChange={e => setExamDuration(e.target.value)} sx={{ mb: '32px'}}/>
                </div>
                <Divider/>
                <div className="exam-edits">
                    <h3>Pytania: </h3>
                    {30}
                    <Button variant="contained" disabled={exam.status !== "Nierozpoczęty"} onClick={() => props.setSelected(4)}>Edytuj pytania<EditIcon/></Button>
                    <FormControlLabel control={<Checkbox/>} label="Oceniaj automatycznie" />
                    <Button variant="contained" disabled={true ? false : exam.status !== "Do oceny"} onClick={() => props.setSelected(5)}>Oceń egzamin <StarHalfIcon/></Button>
                </div>
                <div className="exam-edits">
                    <FormControlLabel control={<Checkbox/>} label="Losuj pytania" />
                    <TextField id="outlined" type="number" variant="outlined" value={15} size="small"/>
                    <FormControlLabel control={<Checkbox/>} label="Zezwól na zmianę pytania" />
                    <Select
                        labelId="grade-message-select-label"
                        id="grade-message-select"
                        value={gradeMessage}
                        label="Wiadomość z oceną"
                        onChange={handleGradeMessageChange}
                    >
                        {gradeMessages.map((m) => <MenuItem value={m.id}>{m.name}</MenuItem>)}
                    </Select>
                    <Button variant="contained" disabled={exam.status !== "Zakończony"} onClick={sendGrades}>Roześlij oceny <SendIcon/></Button>
                </div>
                <Divider/>
                <div className="exam-edits">
                    <h3>Egzaminowani: </h3>
                    {74}
                    <Select
                        labelId="examined-select-label"
                        id="examined-select"
                        value={examinedGroup}
                        label="Egzaminowani"
                        onChange={handleExaminedGroupChange}
                    >
                        {groups.map((g, k) => <MenuItem value={k}>{g}</MenuItem>)}
                    </Select>
                </div>
                <Divider/>
                <div className="exam-edits">
                <Select
                        labelId="exam-start-message-select-label"
                        id="exam-start-message-select"
                        value={startMessage}
                        label="Wiadomość informacyjna"
                        onChange={handleStartMessageChange}
                    >
                        {startMessages.map((m) => <MenuItem value={m.id}>{m.name}</MenuItem>)}
                    </Select>
                    <Button variant="contained" onClick={sendInvitations}>Roześlij wiadomości <SendIcon/></Button>
                </div>
                <Button variant="contained" disabled={exam.status !== "Nierozpoczęty"} onClick={()=> beginExam()}>Rozpocznij egzamin <FlagIcon/></Button>
                <Divider/>
                <div className="exam-edits">
                    <Button variant="contained" color="secondary" onClick={()=>{
                        if(window.confirm("Czy na pewno chcesz usunąć egzamin?")){
                            examService.removeExam(auth.user.access_token, exam.id).then(() => {
                                props.setSelected(0);
                            });
                        }
                    }}>Usuń egzamin <DeleteIcon/></Button>
                    <p>Uwaga, operacja jest nieodwracalna</p>
                </div>
                <div className="exam-edit-save">
                    <Button variant="contained" onClick={()=>{
                        examService.editExam(auth.user.access_token, exam).then(() => {
                            props.setSelected(0);
                        });
                    }}>Zapisz<SaveIcon/></Button>
                </div>
        </div>
    );
}

export default EditExam;