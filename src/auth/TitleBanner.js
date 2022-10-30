import React from "react";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import './TitleBanner.css';

function TitleBanner() {
    return (
        <div id = "app-header">
          <div id = "app-title-container">
            <MenuBookIcon color="secondary" fontSize="large"/>
            <h1 id = "app-title">Exam App</h1>
          </div>
        </div>
    );
}

export default TitleBanner;
