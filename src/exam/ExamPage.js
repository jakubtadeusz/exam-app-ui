import React from "react";
import { useState } from "react";
import UserHeader from "./UserHeader";
import "./ExamPage.css";
import ListAltIcon from '@mui/icons-material/ListAlt';
import MailIcon from '@mui/icons-material/Mail';
import GroupIcon from '@mui/icons-material/Group';
import ExamList from "./ExamList";
import EditExam from "./EditExam";
import QuestionEditList from "./questions/QuestionEditList";
import QuestionService from "../services/QuestionService";
import GradingPage from "./grading/GradingPage";
import MessagePage from "./messages/MessagePage";
import ExaminedPage from "./examined/ExaminedPage";

function ExamPage() {

    const [selected, setSelected] = useState(0);
    let [selectedExam, setSelectedExam] = useState(null);

    let renderContent = () => {
        switch(selected){
            case 0: return <ExamList setSelectedExam={setSelectedExam} changeToEdit={() => setSelected(3)}/>;
            case 1: return <MessagePage/>;
            case 2: return <div><ExaminedPage/></div>;
            case 3: return <div><EditExam exam = {selectedExam} setSelected={setSelected}/></div>
            case 4: return <div><QuestionEditList exam = {selectedExam} setSelected={setSelected}/></div>
            case 5: return <div><GradingPage exam={selectedExam} setSelected={setSelected}/></div>
        }
    }

    return (
        <div id="exam-page">
            <UserHeader name={selected == 4 ? selectedExam.name : ""} resetPage={() => setSelected(0)}/>
            <div id="exam-page-content">   
            <div id="content-selector">
                <div id="exam-list-button" className="menu-item" onClick={() => setSelected(0)}><ListAltIcon/>Egzaminy</div>
                <div id="messages-list-button" className="menu-item" onClick={() => setSelected(1)}><MailIcon/>Wiadomości</div>
                <div id="examined-list-button" className="menu-item" onClick={() => setSelected(2)}><GroupIcon/>Egzaminowani</div>
            </div>
            <div id="content">
                {renderContent()}
            </div>
            </div>
        </div>
    );
}

export default ExamPage;

