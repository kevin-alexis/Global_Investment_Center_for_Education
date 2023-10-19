import React from 'react';
import './DashboardCursos.css'
import TablaDashboard from '../../components/TablaDashboard/TablaDashboard';
import DashHome from "../../components/DashHome/DashHome"
import VerticalNav from "../../components/VerticalNav/VerticalNav"
import './DashboardCursos.css'
import DashBoardCRUD from '../../components/DashBoardCRUD/DashBoardCRUD';

function DashboardCursos() {
    return (
        <>
        
            <div className="DashboardBody">
                <div className='VerticalNavBar'>
                </div>

                <VerticalNav />

                <DashBoardCRUD titulo={'Cursos'}></DashBoardCRUD>
            </div>
        </>
    )
}

export default DashboardCursos
