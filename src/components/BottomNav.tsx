import { Link, useLocation } from "react-router-dom";
// icons
import EventNoteIcon from '@mui/icons-material/EventNote';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PushPinIcon from '@mui/icons-material/PushPin';


export default function BottomNav({currentPage, setCurrentPage}:any) {
    // switch between sites to keep states intact
    let currentRoute = useLocation().pathname; // mandatory: <App> surrounded by <BrowserRouter> inside index.tsx

    let navElements = [
        {name: "Loggar", icon: <EventNoteIcon />, route: "/logs"},
        {name: "Info", icon: <HelpOutlineIcon />, route: "/info"},
        {name: "Anteckningar", icon: <PushPinIcon />, route: "/notes"}
    ];

    let menuItems = navElements.map((el, i) => {
        if (currentRoute.startsWith(el.route)) {
            return (
                <div key={i}>
                    <span className="selected" key={i+"a"}>
                        <span key={i+"b"}>{el.icon}</span>
                        <span key={i+"c"}>{el.name}</span>
                    </span>
                </div>
            )

        } else {
            return (
                <Link
                    key={i}
                    to={el.route}
                >
                    <span key={i+"a"}>
                        <span key={i+"b"}>{el.icon}</span>
                        <span key={i+"c"}>{el.name}</span>
                    </span>
                </Link>
            )
        }
        }
    )

    return (
        <nav className="bottom-nav">
            {menuItems}
        </nav>
    )


}

