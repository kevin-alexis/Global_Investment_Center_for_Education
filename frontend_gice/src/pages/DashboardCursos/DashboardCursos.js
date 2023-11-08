import React from 'react';
import './DashboardCursos.css'
import VerticalNav from "../../components/VerticalNav/VerticalNav"
import './DashboardCursos.css'
import DashBoardCRUD from '../../components/DashBoardCRUD/DashBoardCRUD';

function DashboardCursos() {
    return (
        <>
        
            <div className="DashboardBody">
                <VerticalNav />

                <DashBoardCRUD titulo={'Cursos'}></DashBoardCRUD>
            </div>
        </>
    )
}

export default DashboardCursos
