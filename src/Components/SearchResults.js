import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import SingleSearchResult from "../Components/SingleSearchResult";
import ReactPaginate from "react-paginate";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { getAllLoans } from "../lib/loansDB";

const SearchResults = () => {
  let navigate = useNavigate();
  const { searchResults, loading, setLoggedInUser, checkedFilters } = useContext(AppContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [loans, setLoans] = useState([])
  const resultsPerPage = 6;
  const pagesVisited = pageNumber * resultsPerPage;

  const displayResults = () => {
    if (loans?.length > 0) {
      let filteredId = loans.map(loan => loan.prop_id);
      let filteredLocations = searchResults.filter(location => filteredId.includes(location.prop_id));
      return filteredLocations.slice(pagesVisited, pagesVisited + resultsPerPage).map((singleSearchResult) => {
        return <SingleSearchResult key={singleSearchResult.prop_id} singleSearchResult={singleSearchResult} />;
      })
    } else if (searchResults) {
      return searchResults.slice(pagesVisited, pagesVisited + resultsPerPage).map((singleSearchResult) => {
        return <SingleSearchResult key={singleSearchResult.prop_id} singleSearchResult={singleSearchResult} />;
      })
    }
    return 0;
  }

  useEffect(()=> {
    let changed = {};
    Object.entries(checkedFilters).forEach(
      ([key, value]) => checkedFilters[key].isChecked === true ? changed[key] = value : null);

    const getLoans = async () => {
      let idsInFilter = searchResults.map((property) => {
        return property.prop_id
      })
      let maturityDate = (changed.maturityInTime.date.getUTCFullYear().toString() + '-' + changed.maturityInTime.date.getMonth().toString() + '-' + changed.maturityInTime.date.getUTCDate().toString())
      const res = await getAllLoans(maturityDate.toString(), idsInFilter);
      console.log(res);
      setLoans(res);
    }

    if (changed.hasOwnProperty('maturityInTime')) {
      getLoans();
    } else {
      setLoans([]);
    }
    displayResults();
  }, [checkedFilters])


  const pageCount = loans ? Math.ceil(loans.length / resultsPerPage) : 0 || searchResults ? Math.ceil(searchResults.length / resultsPerPage) : 0;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        navigate(`/login-signup`);
      }
    });
  }, [searchResults]);

  return (
    <div
      id="listOfSearchResults" 
    >
      {/* <div className="d-flex justify-content-center align-items-center grow"> */}
      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          className="loading"
        />
      )}
      {!loading && searchResults && (
        <div
          className="searchResults"
        >
          {displayResults()}
          {searchResults.length > resultsPerPage && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationButtons"}
              previousLinkClassName={"previousButton"}
              nextLinkClassName={"nextButton"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          )}
        </div>
      )}
      {!loading && !searchResults && <div>No Suitable Results Found</div>}
      {/* </div> */}
    </div>
  );
};

export default SearchResults;
