
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import "./Header.css";

const HeaderButtons = ["Default", "Custom"];


/**
 * Create the top nav bar for the web page
 * @return {div} Div that holds the navigation bar for the site
 */
const HeaderObject = () => {

    let location = useLocation();
    let navigate = useNavigate();
    return (
        <div className="topnav">
            {HeaderButtons.map((buttonName) => {
                if ("/" + buttonName === location.pathname) {
                    return (
                        <a className="active" key={buttonName}>
                            {buttonName}
                        </a>
                    );
                }
                return (
                    <a className="inactive" key={buttonName}>
                        <button
                            className={"BlankButton"}
                            onClick={() => {
                                navigate(buttonName);
                            }}
                        >
                            {buttonName}
                        </button>
                    </a>
                );
            })}
        </div>
    );
}


export { HeaderObject }