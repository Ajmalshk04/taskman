import WhyIllustration from '../assets/4. Why/Why_Illustration-1.svg';
import WhyIllustration2 from '../assets/4. Why/Why_Illustration-2.svg';
import WhyShapeRect from '../assets/4. Why/Why_Shapes_Rectangle-v2.svg';
import WhyShapeCircle from '../assets/4. Why/Why_Shapes_Ellipse.svg';
import Arrow from '../assets/4. Why/Arrow_icon.svg';
import styles from '../styles/WhyUs.module.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const WhyUs = () => {
    const ref = useScrollAnimation();

    return (
        <section className={styles.section} ref={ref}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Left Content - Image */}
                    <div className={styles.imageContainer}>
                        {/* Background Shapes */}
                        {/* Yellow Diagonal/Rectangle - Draw in effect */}
                        <div className={`${styles.shapeRect} why-shape-rect`}>
                            <img
                                src={WhyShapeRect}
                                alt=""
                                className={styles.shapeImg}
                            />
                        </div>

                        {/* Dark Circle - Grow into position */}
                        <div className={`${styles.shapeCircle} why-shape-circle`}>
                            <img
                                src={WhyShapeCircle}
                                alt=""
                                className={styles.shapeImg}
                            />
                        </div>

                        {/* Dashboard Card - Scale/burst into position */}
                        <div className={`${styles.illustration} ${styles.illustration1} why-card why-card-1`}>
                            <img
                                src={WhyIllustration}
                                alt="Task Management Dashboard"
                                className={`${styles.illustrationImg} ${styles.illustration1Img} why-card-img`}
                            />
                        </div>
                        <div className={`${styles.illustration} ${styles.illustration2} why-card why-card-2`}>
                            <img
                                src={WhyIllustration2}
                                alt="Task Management Dashboard"
                                className={`${styles.illustrationImg} why-card-img`}
                            />
                        </div>
                    </div>

                    {/* Right Content - Text */}
                    <div className={styles.textContainer}>
                        <h2 className={`${styles.title} why-text-title`}>
                            Why do you need <br />
                            task management <br />
                            software?
                        </h2>
                        <p className={`${styles.description} why-text-description`}>
                            Do you waste time organizing sticky notes, searching your email and apps for to-dos, and figuring out what to work on first? Then you need one solution to prioritize your tasks, manage your time, and meet your deadlines.
                        </p>

                        <a href="#" className={`${styles.learnMoreLink} why-text-link`}>
                            LEARN MORE
                            <span className={styles.arrowIcon}>
                                 <img
                                src={Arrow}
                                alt="learn more"
                                className={styles.arrowImg}
                            />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
