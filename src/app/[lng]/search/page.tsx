"use client";

import { View } from "@adobe/react-spectrum";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ImageGridList from '@/components/ImageGrid/index'

// const fetchPosts = (url: string) => new Promise ((resolve, reject) => {
//     fetch(url, {
//         method: 'GET',
//         headers: {
//             'x-api-key': 'PSXIOS3'
//         }})
//         .then(json => resolve(json));
// });

const fetchPosts = (url: string) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': 'PSXIOS3'
      }
    }).then((response) => response.json());
  };

const SearchPage = () => {

    const search = useSearchParams();
    const [jsonData, setJsonData] = useState<any>(null);
    const searchQuery = search ? search.get("q") : null;
    console.log('SEARCH PARAMS', searchQuery);

    const encodedSearchQuery:string = encodeURI(searchQuery || "");

    const query = encodedSearchQuery;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const jsonData = await fetchPosts(
              `https://cc-api-cp-stage.adobe.io/api/v2/psx/assets?query=${encodedSearchQuery}&size=25`
            );
            console.log('PRINTING DATA', jsonData);
            setJsonData(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [fetchPosts, encodedSearchQuery]);


    // if(!jsonData) {
    //     return null;
    // }
    
console.log("PRINTING FROM", jsonData);
    return (
        <div>
            <p>
                Search Results
            </p>
        
        <div className="container">
            <View>
                <ImageGridList query={encodedSearchQuery} />
            </View>
        </div>
        </div>
    );

};

export default SearchPage;