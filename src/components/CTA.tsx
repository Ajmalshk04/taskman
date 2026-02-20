import signup from '../assets/5. Signup/Signup_Shape.svg';
import styles from '../styles/CTA.module.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CTA = () => {
    const ref = useScrollAnimation();

    return (
        <section className={styles.section} ref={ref}>
            {/* Blue triangular shape on the right - MORE PROMINENT */}
            <div className={`${styles.shapeContainer} cta-shape`}>
                  <img
                    src={signup}
                    alt="signup"
                    className={styles.shapeImg}
                    />
            </div>

            <div className={styles.contentContainer}>
                <h2 className={`${styles.title} cta-title`}>
                    Get better work done
                </h2>

                <p className={`${styles.description} cta-description`}>
                    See why millions of people across 195 countries use TaskMan.
                </p>

                <div className={`${styles.inputContainer} cta-form`}>
                    <input
                        type="email"
                        placeholder="Name@company.com"
                        className={styles.emailInput}
                    />
                    <button className={styles.submitButton}>
                        Try for free
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
