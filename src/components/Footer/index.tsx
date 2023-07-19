import React from 'react';
import styles from './footer.module.scss';
// import AdobeLogo from '@react/react-spectrum/Icon/AdobeLogo';
import LanguageSwitcher from '../LanguageSwitcher';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.language}>
                Language: 
                <LanguageSwitcher/>
            </div>
        <a className={styles.footerBlock} href="https://forums.adobe.com/community/adobecolor" target="_blank">
            User Forums
        </a>
        <a className={styles.footerBlock} href="https://color.adobe.com/community-guidelines" target="_blank">
            Community Guidelines
        </a>
        <span className={`${styles.footerBlock} ${styles.copyright}`}>
            Copyright © 2023 Adobe. All rights reserved.
        </span>
        <a className={styles.footerBlock} href="https://www.adobe.com/privacy.html" target="_blank">
            Privacy
        </a>
        <a className={styles.footerBlock} href="http://www.adobe.com/go/terms" target="_blank">
            Terms of Use
        </a>
        <a href="#" id="openCookieModal" className={styles.oneTrustLink}>
            Cookie preferences
        </a>
        <div className={styles.adobeLink}>
            <a href="https://www.adobe.com/" target="_blank">
                {/* <AdobeLogo className={styles.appreciateIcon} size='S' /> */}
                <span className={styles.adobeText}> Adobe </span>
            </a>
        </div>
            
    </footer>
  );
};

export default Footer;
