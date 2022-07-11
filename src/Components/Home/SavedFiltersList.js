import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import "../../App.css";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import { BsTrash } from "react-icons/bs";

const SavedFiltersList = () => {
  let navigate = useNavigate();
  const {
    loggedInUser,
    openMoreFilters,
    setOpenMoreFilters,
    arrayOfFilters,
    setArrayOfFilters,
  } = useContext(AppContext);

  //   console.log("here is array of filters from list");
  //   console.log(arrayOfFilters);

  const handleAddSavedFilters = (element) => {
    if (Object.keys(loggedInUser).length !== 0) {
      navigate(`/filters/${element.route}`);
      setOpenMoreFilters(true);
    } else {
      navigate(`./login-signup`);
    }
  };

  const handleDelete = (route) => {
    const newArray = arrayOfFilters.filter(
      (element) => element.route !== route
    );
    setArrayOfFilters(newArray);
  };

  return (
    <div className="SavedFiltersListContainer">
      {arrayOfFilters.slice(1).map((element) => {
        return (
          <ul key={uuidv4()}>
            <li className="specificSavedFilters">
              <button
                onClick={() => handleAddSavedFilters(element)}
                className="specificSavedFiltersButton"
              >
                <div>
                  Saved as:
                  <br /> <b className="filtersTitle">{element.title}</b>
                </div>
              </button>
              <button
                className="specificSavedFiltersDelete"
                onClick={() => handleDelete(element.route)}
              >
                <BsTrash />
              </button>
            </li>
          </ul>
        );
      })}
      <Link to="/filters/0" onClick={() => setOpenMoreFilters(true)}>
        <div id="savedFiltersListMoreFiltersButton">
          <Button
            aria-expanded={openMoreFilters}
            id="savedFiltersListMoreFiltersButtonIcon"
          >
            <FaPlus size="30px" />
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default SavedFiltersList;
