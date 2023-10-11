import DashHome from "../../components/DashHome/DashHome"
import VerticalNav from "../../components/VerticalNav/VerticalNav"
import './Dashboard.css'

function Dashboard() {
    return (
        <>
            <div className="DashboardBody">
                <VerticalNav />

                
                <DashHome></DashHome>     

            </div>
        </>
    )
}

export default Dashboard