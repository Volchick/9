import styles from "./AsteroidCardContent.module.css"

type AsteroidCardContentProps = {
    name: string;
    date: string;
    distance: {
        kilometers: number;
        lunar: number
    },
    size: number;
    DistanceMode: boolean
}

export const AsteroidCardContent = (props: AsteroidCardContentProps) => {
    const { name, date, distance, size, DistanceMode } = props;
    return (<div>
        <div className={styles.contentName}>{name}</div>
        <div className={styles.contentWrapper}>
            <div className={styles.contentDate}>{`Date: ${date}`}</div>
            <div className={styles.contentDistance}> {`Distance: ${DistanceMode ? distance.lunar : distance.kilometers} ${DistanceMode ? 'dist.' : 'km'}`}</div>
            <div className={styles.contentSize}>{`Size: ${size} m`}</div>
        </div>
    </div>)
}
