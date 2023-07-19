"use client";

import { useRouter, usePathname } from "next/navigation";
import { SearchField } from "@/libs/spectrum";

const SearchInput = () => {

    const router = useRouter();
    const pathUrl = usePathname();

    const onSearch = (query: string) => {
        console.log("search query: ", query);
        const encodedQuery = encodeURI(query);

        const parts = pathUrl.split('/');
        const locale = parts[1];

        router.push(`/${locale}/search?q=${encodedQuery}`);

    };

    return (
        <SearchField
            position={'relative'}
            top={'size-10'}
            // width={'size-5000'}
            onSubmit={(query) => onSearch(query)}
        />
    );

}

export default SearchInput;
