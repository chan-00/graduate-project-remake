function functionGetInfoMoveSearch(setSearchResultArray, searchText, setStartIndex, setPreviousIndex, index) {

    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.apiKey}&cx=${process.env.cxValue}&q=${searchText}&start=${index}`;

    fetch(apiUrl).then((response) => response.json()).then((data) => {
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

export default functionGetInfoMoveSearch;