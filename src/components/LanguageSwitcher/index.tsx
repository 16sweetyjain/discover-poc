"use client";

import React, { useState } from 'react';
// import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
// import Popover from '@react/react-spectrum/Popover';
// import SelectList from '@react/react-spectrum/SelectList';
import { LANGUAGE_EXPANDED_MAP } from '../../../constants/constants';


import { DialogTrigger, Dialog, ActionButton, Heading, Divider, Content, Text, ListBox, Item, Menu } from '@adobe/react-spectrum';

import { useRouter, useParams, usePathname, useSelectedLayoutSegments } from "next/navigation";

// import { useRouter } from 'next/router';

import styles from './LanguageSwitcher.module.scss';

import Link from 'next/link';

const LanguageSwitcher: React.FC = () => {

    // const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
    const [selectedLanguage, setSelectedLanguage] = useState(new Set(['en']));
    const [show, setShow] = useState<boolean>(false);
    const router = useRouter();
    const abc = usePathname();

    const toggleLanguageSelector = () => {
        // this.setMaxHeightForLanguageSelector();
        // setSelectedLanguage();
        setShow(!show);
    };

    const composeUrlWithNewLocale = (locale) => {
        const parts = abc.split('/');
        if (parts.length >= 2) {
            parts[1] = locale;
        }
        const partsUnited = parts.join('/');
        return partsUnited;

    }

    const onChange = (locale) => {

        const selectedLocaleArray = Array.from(locale);
        const localeSelected = selectedLocaleArray[0];

        setSelectedLanguage(locale);

        const url = composeUrlWithNewLocale(localeSelected);

        const parts = url.split('/');
        const dynamicURL = `/${parts.slice(1).join('/')}`;
        router.push(dynamicURL);

        toggleLanguageSelector();
    }

    const options = Object.keys(LANGUAGE_EXPANDED_MAP).map(language => {
        const json = {
            label: LANGUAGE_EXPANDED_MAP[language],
            value: language
        };

        return json;
    });

    let menuItems = [
        { name: 'en' },
        { name: 'de' },
        { name: 'es' },
        { name: 'fr' },
        { name: 'ja' },
        { name: 'ko' },
        { name: 'pt' },
        { name: 'zh' },
    ];

    const selectedLanguageArray = Array.from(selectedLanguage);
    const language = selectedLanguageArray[0];

    return (
        <DialogTrigger type="popover">
            <ActionButton isQuiet top={-10}>
            <div className={styles.languageInput}>
                {LANGUAGE_EXPANDED_MAP[language]}
            </div>
            </ActionButton>
      
                <Menu
                    selectionMode="single"
                    selectedKeys={selectedLanguage}
                    onSelectionChange={onChange}
                    items={menuItems}
                >
                    {item => <Item key={item.name}>{LANGUAGE_EXPANDED_MAP[item.name]}</Item>}
                </Menu>
          
        </DialogTrigger>
    );

};

export default LanguageSwitcher;