import DashBoardCRUD from "../../components/DashBoardCRUD/DashBoardCRUD"
import VerticalNav from "../../components/VerticalNav/VerticalNav"

function DashboardUsers() {
    return (
        <>
            <div className="DashboardBody">
                <VerticalNav />

                <DashBoardCRUD titulo='Users' />
            </div>
        </>
    )
}

export default DashboardUsers