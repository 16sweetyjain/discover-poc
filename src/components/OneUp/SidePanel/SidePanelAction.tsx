"use client";

import { Button, Flex, Text, View } from "@adobe/react-spectrum";
import ShareIcon from '@spectrum-icons/workflow/Share';

import style from './side-panel-action.module.scss'
import QRModal from "@/components/QRModal/Modal";
import { useState } from "react";

export default function SidePanelAction() {
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
    return <View>
        <Flex columnGap={10} UNSAFE_className={style.innerDiv}>
            <Button variant="cta" onPress={handleModal}>
                Try Now
            </Button>
            <Button variant="primary" onPress={handleModal}>
                <ShareIcon />
                <Text>Share</Text>
            </Button>
        </Flex>
        <QRModal open={modal} setOpen={handleModal} />
    </View>
}