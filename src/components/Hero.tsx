// Hero Assets
import HeroCard1 from '../assets/1. Hero/Hero_Illustration_Card-1.svg';
import HeroCard2 from '../assets/1. Hero/Hero_Illustration_Card-2.svg';
import HeroCard3 from '../assets/1. Hero/Hero_Illustration_Card-3.svg';
import HeroCard4 from '../assets/1. Hero/Hero_Illustration_Card-4.svg';

import HeroShapeBlue from '../assets/1. Hero/Hero_Shapes_1.svg';
import HeroShapeYellow from '../assets/1. Hero/Hero_Shapes_2.svg';
import HeroShapeDark from '../assets/1. Hero/Hero_Shapes_3.svg';

// Logo Assets
import BookingLogo from '../assets/2. Logos/Booking.com_logo.svg';
import CNLogo from '../assets/2. Logos/Cartoon_Network_logo.svg';
import DropboxLogo from '../assets/2. Logos/Dropbox_logo.svg';
import ToshibaLogo from '../assets/2. Logos/Toshiba_logo.svg';
import SlackLogo from '../assets/2. Logos/Slack_logo.svg';
import NetflixLogo from '../assets/2. Logos/Netflix_logo.svg';
import SpotifyLogo from '../assets/2. Logos/Spotify_logo.svg';
import CocaColaLogo from '../assets/2. Logos/CocaCola_logo.svg';
import RedBullLogo from '../assets/2. Logos/RedBull_logo.svg';

import styles from '../styles/Hero.module.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
    const ref = useScrollAnimation();

    const logos = [
        { src: CNLogo, alt: "Cartoon Network", width: 80 },
        { src: BookingLogo, alt: "Booking.com", width: 120 },
        { src: DropboxLogo, alt: "Dropbox", width: 100 },
        { src: ToshibaLogo, alt: "Toshiba", width: 100 },
        { src: SlackLogo, alt: "Slack", width: 90 },
        { src: NetflixLogo, alt: "Netflix", width: 90 },
        { src: SpotifyLogo, alt: "Spotify", width: 90 },
        { src: CocaColaLogo, alt: "CocaCola", width: 90 },
        { src: RedBullLogo, alt: "RedBull", width: 90 },
    ];

    return (
        <section className={styles.section} ref={ref}>
            <div className={styles.container}>
                {/* Left side - 60% */}
                <div className={styles.leftSide}>
                    <h1 className={styles.title}>
                        Task Management <br />
                        And Lists Tool
                    </h1>
                    <p className={styles.description}>
                        There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form, by injected humour.
                    </p>

                    <div className={styles.inputContainer}>
                        <input
                            type="email"
                            placeholder="Name@company.com"
                            className={styles.emailInput}
                        />
                        <button className={styles.tryButton}>
                            Try for free
                        </button>
                    </div>

                    {/* Logos Grid */}
                    <div className={styles.logosGrid}>
                        {logos.map((logo, index) => (
                            <div key={index} className={styles.logoItem}>
                                <img 
                                    src={logo.src} 
                                    alt={logo.alt} 
                                    className={styles.logoImg}
                                    style={{
                                        filter: 'grayscale(100%)',
                                        opacity: 0.5,
                                        transition: 'filter 0.3s ease, opacity 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.filter = 'grayscale(0%)';
                                        e.currentTarget.style.opacity = '1';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.filter = 'grayscale(100%)';
                                        e.currentTarget.style.opacity = '0.5';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Right side - 40% */}
                <div className={styles.rightSide}>
                    {/* Background Shapes - Static positioning */}
                    <div className={styles.shapesContainer}>
                        {/* Shape 1: Blue Circle - BOTTOM layer (back) */}
                        <div className={`${styles.shapeBlue} hero-shape-blue`}>
                            <img
                                src={HeroShapeBlue}
                                alt=""
                                className={styles.shapeImg}
                            />
                        </div>

                        {/* Shape 2: Yellow Arc - MIDDLE layer */}
                        <div className={`${styles.shapeYellow} hero-shape-yellow`}>
                            <img
                                src={HeroShapeYellow}
                                alt=""
                                className={styles.shapeImg}
                            />
                        </div>

                        {/* Shape 3: Dark Navy Circle - TOP layer (front) */}
                        <div className={`${styles.shapeDark} hero-shape-dark`}>
                            <img
                                src={HeroShapeDark}
                                alt=""
                                className={styles.shapeImg}
                            />
                        </div>
                    </div>

                    {/* UI Cards Layer - Static positioning */}
                    <div className={styles.cardsContainer}>
                        {/* Card 1: Top */}
                        <div className={`${styles.card} ${styles.card1} hero-card-1`}>
                            <img
                                src={HeroCard1}
                                alt="Card 1"
                                className={`${styles.cardImg} hero-card-img`}
                            />
                        </div>

                        {/* Card 2: Middle */}
                        <div className={`${styles.card} ${styles.card2} hero-card-2`}>
                            <img
                                src={HeroCard2}
                                alt="Card 2"
                                className={`${styles.cardImg} hero-card-img`}
                            />
                        </div>

                        {/* Card 3: Bottom */}
                        <div className={`${styles.card} ${styles.card3} hero-card-3`}>
                            <img
                                src={HeroCard4}
                                alt="Card 3"
                                className={`${styles.cardImg} hero-card-img`}
                            />
                        </div>

                        {/* Card 4: Bottom */}
                        <div className={`${styles.card} ${styles.card4} hero-card-4`}>
                            <img
                                src={HeroCard3}
                                alt="Card 3"
                                className={`${styles.cardImg} hero-card-img`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
