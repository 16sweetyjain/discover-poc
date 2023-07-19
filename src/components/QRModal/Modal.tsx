'use client';
import { Button, Content, Dialog, DialogContainer, Flex, Grid, Heading, View, useDialogContainer, Text } from '@/libs/spectrum';
import Image from 'next/image'
import PSXQR from '@/assets/PSX-QR.svg'
import PSXLogo from '@/assets/psx.png'
import Close from '@spectrum-icons/workflow/Close';
import CropLightning from '@spectrum-icons/workflow/CropLightning';
import Gallery from '@spectrum-icons/workflow/CoverImage';
import GalleryAdd from '@spectrum-icons/workflow/ImageAlbum';


export default function QRModal({ open = false, setOpen }) {

    return <DialogContainer type="modal" onDismiss={() => setOpen(false)}>
        {open && <QRDialog />}
    </DialogContainer>
}


function QRDialog() {
    const dialog = useDialogContainer();

    return <Dialog width={"70vw"} height={"70vh"}>
        <Content>
            <Grid
                columns={["1fr", "1fr"]}
                height="100%"
                gap="size-100">
                <Flex direction={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Image src={PSXQR} width={400} height={400} alt="PSX QR Code" />
                </Flex>
                <View backgroundColor={'gray-200'}>
                    <Flex justifyContent={'center'} height={'100%'} direction={'column'} maxWidth={"90%"} marginX={"auto"} rowGap={15}>
                        <Image src={PSXLogo} width={40} height={40} alt="PSX Logo" />
                        <Heading level={2}>
                            Download Photoshop Express Mobile App
                        </Heading>
                        <Text>
                            Unleash your creativity! Quickly create, edit and share images that make an impression.
                        </Text>
                        <Flex direction={'column'} gap={8}>
                            <Flex gap={10}>
                                <CropLightning /> <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quia!</Text>
                            </Flex>
                            <Flex gap={10}>
                                <Gallery /> <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quia!</Text>
                            </Flex>
                            <Flex gap={10}>
                                <GalleryAdd /> <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quia!</Text>
                            </Flex>
                        </Flex>
                        <Text>
                            Open the camera app from your phone and Scan the QR code to download the Photoshop app.
                        </Text>
                    </Flex>
                </View>
            </Grid>
        </Content>
        <Button variant="cta" onPress={dialog.dismiss} position="absolute" top={-15} right={-15}>
            <Close />
        </Button>
    </Dialog>
}