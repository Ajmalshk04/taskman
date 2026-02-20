import { useEffect, useRef, useState } from 'react';
import IconTrack from '../assets/3. Benefits/Benefits_Icon_Track.svg';
import IconPrioritize from '../assets/3. Benefits/Benefits_Icon_Priotitize.svg';
import IconCollaborate from '../assets/3. Benefits/Benefits_Icon_Collaborate.svg';
import styles from '../styles/Benefits.module.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Benefits = () => {
    const [animatedItems, setAnimatedItems] = useState<boolean[]>([false, false, false]);
    const containerRef = useRef<HTMLDivElement>(null);
    const ref = useScrollAnimation();

    const benefits = [
        {
            icon: IconTrack,
            title: "Keep tasks in one place",
            description: "Save time, avoid losing work and information, delegate, and track tasks to stay on schedule"
        },
        {
            icon: IconPrioritize,
            title: "Prioritize your work",
            description: "Tracking tasks allows everyone to understand which are more important or require more time, so"
        },
        {
            icon: IconCollaborate,
            title: "Improve collaboration",
            description: "Tracking tasks allows everyone to understand which are more important or require more time, so"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Trigger animations one by one with staggered delay
                        benefits.forEach((_, index) => {
                            setTimeout(() => {
                                setAnimatedItems((prev) => {
                                    const updated = [...prev];
                                    updated[index] = true;
                                    return updated;
                                });
                            }, index * 200);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <section className={styles.section} ref={ref}>
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <h2 className={styles.title}>
                        Key benefits of using task <br />
                        management software
                    </h2>
                </div>

                <div className={styles.grid} ref={containerRef}>
                    {benefits.map((benefit, index) => (
                        <div 
                            key={index}
                            className={`${styles.benefitCard} benefit-card`}
                            style={{
                                opacity: animatedItems[index] ? 1 : 0,
                                transform: animatedItems[index] ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.7s ease-out'
                            }}
                        >
                            <div className={styles.iconContainer}>
                                <img src={benefit.icon} alt={benefit.title} className={styles.icon} />
                            </div>
                            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                            <p className={styles.benefitDescription}>
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
