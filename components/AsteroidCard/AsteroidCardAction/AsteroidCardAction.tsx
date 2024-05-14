import styles from "./AsteroidCardAction.module.css"

export const AsteroidCardAction = ({ isDangerous }) => {
    return (<div>
        <div className={styles.actionGrade}>{`Estimation: ${isDangerous ? 'dangerous' : 'not dangerous'}`}</div>
        <button className={styles.action}>
            <div className={styles.actionText}>To destroyment</div>
        </button>
    </div>)
}