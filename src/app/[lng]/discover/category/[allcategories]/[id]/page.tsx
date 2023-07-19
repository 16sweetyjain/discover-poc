import ImagePanel from "@/components/OneUp/ImagePanel/ImagePanel";
import ProfilePanel from "@/components/OneUp/SidePanel/ProfilePanel";
import SideDescriptionPanel from "@/components/OneUp/SidePanel/SideDescriptionPanel";
import SidePanelAction from "@/components/OneUp/SidePanel/SidePanelAction";
import { Grid, View } from "@/libs/spectrum";
import axios from "axios";

export const revalidate = false;

async function fetchSingleDiscoverAsset(uuid: string): Promise<{ data: any, error: any }> {
    const url = `https://${process.env.cpApiHost}${process.env.cpAssetApiPath}/${uuid}`;
    try {
        const { data } = await axios.get(url, {
            params: {
                api_key: process.env.cpApiKey
            }
        });
        return {
            data,
            error: null
        }
    } catch (e) {
        return {
            data: null,
            error: e
        }
    }
}

export default async function OneUpPage({ params }) {
    const { id } = params;
    const { data, error } = await fetchSingleDiscoverAsset(id);
    if (error) return <h1>Error found ...</h1>
    return <Grid rowGap={30} columns={{ base: ["1fr"], L: ["auto 350px"] }} rows={["auto auto auto auto"]}>
        <View gridColumn={{ base: "1/1", L: "1/2" }} gridRow={{ base: "2/3", L: "1/5" }}>
            <ImagePanel data={data} />
        </View>
        <View gridColumn={{ base: "1/1", L: "2/3" }} gridRow={{ base: "1/2", L: "1/2" }}>
            <ProfilePanel data={data} />
        </View>
        <View gridColumn={{ base: "1/1", L: "2/3" }} gridRow={{ base: "4/5", L: "2/3" }}>
            <SideDescriptionPanel tags={data.auto_tags} description={data.description} />
        </View>
        <View gridColumn={{ base: "1/1", L: "2/3" }} gridRow={{ base: "3/4", L: "3/4" }}>
            <SidePanelAction />
        </View>
    </Grid>
} 
