import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                TaskMan
            </div>
            
            <div className={styles.buttonContainer}>
                <button className={styles.tryButton}>
                    Try free
                </button>
            </div>
        </header>
    );
};

export default Header;
