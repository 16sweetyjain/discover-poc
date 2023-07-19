import { Heading, View } from "@/libs/spectrum";
import { Metadata } from "next";

import axios from "axios";
import ImageGridList from "@/components/ImageGrid/index";

import { TFunction } from "i18next";
import { useTranslation } from "../../../../i18n"; // TODO use alias
import CategoryBar from "@/components/CategoryBar/CategoryBar";
import ImageGrid from "@/components/ImageGrid";
import style from "@/components/CategoryBar/categoryBar.module.scss";
import { fetchCategories } from "@/utils/api";
import "@/styles/colors-light.scss";
import "@/styles/colors-dark.scss";

export const revalidate = true;

export const metadata: Metadata = {
  title: "Photoshop Express Discover",
};

async function fetchDiscoverAssets(): Promise<{ data: any; error: any }> {
  const url = `https://${process.env.cpApiHost}${process.env.cpAssetApiPath}`;
  try {
    const { data } = await axios.get(url, {
      params: {
        size: process.env.imagePerPage,
        api_key: process.env.cpApiKey,
      },
    });
    return {
      data,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e,
    };
  }
}

export default async function Page({ params: { lng, allcategories } }) {
  const { t }: { t: TFunction } = await useTranslation(lng, "discover-tr");

  const { data, error } = await fetchDiscoverAssets();
  const { data: catData, error: errorData } = await fetchCategories();

  if (error) {
    return <h1>Something went wrong ...</h1>;
  }
  return (
    <View top={0}>
      <View
        position={"sticky"}
        top={66}
        zIndex={10}
        padding={10}
        UNSAFE_className={style.categoryBackgroundColor}
      >
        <Heading level={1} marginStart={55} marginTop={30}>{t("get_inspired")}</Heading>
        <CategoryBar data={catData?._embedded?.categories} />
      </View>

      <div className="container">
        <div className={style.images}>
          <ImageGridList query={allcategories} />

          


        </div>
      </div>
    </View>
  );
}
