'use client';

import { Button, Flex, Heading, View } from '@adobe/react-spectrum';
import Image from 'next/image';
import Link from 'next/link';

import style from './app-bar.module.scss';


import PSXLogo from '@/assets/psx.png';

import SearchInput from '@/app/[lng]/discover/SearchInput';

import { useState } from 'react';
import QRModal from '@/components/QRModal/Modal';


export default function AppBar() {

    const [modal, setModal] = useState(false);

    const handleModal = () => {
        var userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            window.location.href = 'https://apps.apple.com/us/app/adobe-photoshop/id331975235';
        }
        else if (/android/i.test(userAgent)) {
            window.location.href = 'https://play.google.com/store/apps/details?id=com.adobe.psmobile';
        } else
            setModal(!modal);
    }

    return (
        <View borderBottomColor={'gray-300'} borderBottomWidth={'thick'} paddingX={'size-200'} position={'sticky'} top={0} zIndex={10} UNSAFE_className={style.appBar}>
            <Flex alignItems={'center'} justifyContent={'space-between'} height={'size-800'}>
                <Flex alignItems={'center'}>
                    <Link href={"/en/discover/category/all"}>
                        <Flex alignItems={'center'} gap={'size-100'}>
                            <Image src={PSXLogo} width={40} height={40} alt="Photoshop Express Logo" className={style.logo} />
                            <Heading level={3} isHidden={{ base: true, S: false }}>
                                Photoshop Express
                            </Heading>
                        </Flex>
                    </Link>
                </Flex>
                <Flex alignItems={'center'}>
                    <SearchInput />
                </Flex>
                <Flex direction={'row'} alignItems={'center'} gap={'size-100'}>
                    <Button variant="secondary" onPress={handleModal}>
                        Sign in
                    </Button>
                    <Button variant="cta" isHidden={{ base: true, S: false }} onPress={handleModal}>
                        Download
                    </Button>
                </Flex>
            </Flex>
            <QRModal open={modal} setOpen={handleModal} />
        </View>
    )
}