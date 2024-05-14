import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
    return <div className={ styles.container}>
        <div>
            <h1>ARMAGGEDON V</h1>
            <div>Service for monitoring and destroying asteroids which came dangerously close to the Earth</div>
        </div>
        <div>
            <Link to={"/asteroids" }>Asteroids </Link>
            <Link to={"/destroyment"}>Destroyment</Link>
        </div>
    </div>
}
