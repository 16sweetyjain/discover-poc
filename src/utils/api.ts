
export async function fetchCategories() {

    const url = `https://${process.env.cpApiHost}${process.env.cpCategoryApiPath}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/hal+json",
          "x-api-key": process.env.cpApiKey,
        },
        
      });
      if (response.ok) {
        const data = await response.json();
        return {
          data,
          error: null,
          
        };
      } else {
        return {
          data: null,
          error: "Something went wrong",
        };
      }
    } catch (error) {
      return {
        data: null,
        error: "Something went wrong",
      };
    }
    
  }
