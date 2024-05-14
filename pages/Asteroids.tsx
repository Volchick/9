import { Header } from '../components/header/Header'
import styles from './Asteroids.module.css'
import { useEffect, useState } from 'react'
import { AsteroidCard } from '../components/AsteroidCard/AsteroidCard.tsx'

export const Asteroids = () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    let link = '';
    if (API_KEY === undefined) {
        link = `https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY`
    } else {
        link = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`
    }
    const [asteroids, setAsteroids] = useState<
        {
            name: string
            date: string
            distance: {
                kilometers: number
                lunar: number
            },
            size: number
            id: string
            isDangerous: boolean
        }[]
        >([])

    const [onlyDangerous, setOnlyDangerous] = useState(false)
    let [isKM, setKM] = useState(false)

    useEffect(() => {
        try {
            console.log(link)
            const result = fetch(link)
                .then((res) => {
                    return res.json()
                })
                .then((response) => {
                    let rawAsteroids = []
                    for (const data in response.near_earth_objects) {
                        rawAsteroids = rawAsteroids.concat(
                            response.near_earth_objects[data]
                        )
                    }
                    const asteroids = rawAsteroids.map((item) => {
                        const size = Math.trunc(
                            (item.estimated_diameter.meters
                                .estimated_diameter_max +
                                item.estimated_diameter.meters
                                    .estimated_diameter_min) /
                            2
                        )
                        const close = item.close_approach_data[0]

                        return {
                            name: item.name,
                            date: close.close_approach_date,
                            size,
                            distance: {
                                kilometers: Math.trunc(
                                    close.miss_distance.kilometers
                                ),
                                lunar: Math.trunc(close.miss_distance.lunar),
                            },
                            isDangerous: item.is_potentially_hazardous_asteroid,
                            id: item.id,
                        }
                    })

                    setAsteroids(asteroids)
                })
        } catch(err) {
            console.log(err)
            setAsteroids(generateAsteroids())
        }
    }, [])

    return (
        <div>
        <Header />
            <div className={styles.filterConteiner}>
                <div className={styles.showDangerousOnly}>
                    <input
                        type='checkbox'
                        value={onlyDangerous as unknown as string}
                        onChange={() => setOnlyDangerous(!onlyDangerous)}
                    ></input>
                    Show only dangerous
                </div>
                <div className={styles.distanceMode}>
                    Distance
                    <button
                        className={styles.distanceButtons}
                        value={isKM as unknown as string}
                        onClick={() => setKM((isKM = false))}
                    >
                        in kilometers
                    </button>
                    ,
                    <button
                        className={styles.distanceButtons}
                        value={isKM as unknown as string}
                        onClick={() => setKM((isKM = true))}
                    >
                        in distances to Moon
                    </button>
                </div>
                <div style={{ margin: "80px" }}>
                </div>
            </div>
            {isKM
                ? onlyDangerous
                    ? asteroids
                        .filter((item) => item.isDangerous)
                        .map((item) => (
                            <AsteroidCard
                                key={item.id}
                                name={item.name}
                                date={item.date}
                                size={item.size}
                                distance={item.distance}
                                isDangerous={item.isDangerous}
                                DistanceMode={true}
                            />
                        ))
                    : asteroids.map((item) => (
                        <AsteroidCard
                            key={item.id}
                            name={item.name}
                            date={item.date}
                            size={item.size}
                            distance={item.distance}
                            isDangerous={item.isDangerous}
                            DistanceMode={true}
                        />
                    ))
                : onlyDangerous
                    ? asteroids
                        .filter((item) => item.isDangerous)
                        .map((item) => (
                            <AsteroidCard
                                key={item.id}
                                name={item.name}
                                date={item.date}
                                size={item.size}
                                distance={item.distance}
                                isDangerous={item.isDangerous}
                                DistanceMode={false}
                            />
                        ))
                    : asteroids.map((item) => (
                        <AsteroidCard
                            key={item.id}
                            name={item.name}
                            date={item.date}
                            size={item.size}
                            distance={item.distance}
                            isDangerous={item.isDangerous}
                            DistanceMode={false}
                        />
                    ))}
        </div>
        )
}

const generateAsteroids = () => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const result = []

    for (let i = 0; i < 10; i++) {
        const name =
            characters[(Math.random() * 25).toFixed(0)] +
            characters[(Math.random() * 25).toFixed(0)]
        const date = `${(Math.random() * 27 + 1).toFixed(0)} ${months[(Math.random() * 11).toFixed(0)]} 2024`
        const size = (Math.random() * 100 + 10).toFixed(0)
        const distance = (Math.random() * 90000000).toFixed(0)
        const isDangerous = Math.random() >= 0.5

        result.push({ id: name, name, date, size, distance, isDangerous })
    }
    return result
}