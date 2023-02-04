function functionGetInfoSearch(setLoadingStatus, setSearchResultArray, searchTextRef, setSearchText, setStartIndex, setPreviousIndex) {
    if(searchTextRef.current.value.includes("&")) {
        alert("검색어에 & 값이 포함되어 있습니다!");
        searchTextRef.current.focus();
        return false;
    }

    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.apiKey}&cx=${process.env.cxValue}&q=${searchTextRef.current.value}`;

    fetch(apiUrl).then((response) => response.json()).then((data) => {
        setLoadingStatus(true);
        setSearchText(searchTextRef.current.value);
  
        if(data.queries.nextPage) {
          setStartIndex(data.queries.nextPage[0].startIndex);
        }
        else if(!data.queries.nextPage) {
          setStartIndex(0);
        }
        if(data.queries.previousPage) {
          setPreviousIndex(data.queries.previousPage[0].startIndex);
        }
        else if(!data.queries.previousPage) {
          setPreviousIndex(0);
        }
  
        setSearchResultArray(data.items);
    });
  
}

export default functionGetInfoSearch;