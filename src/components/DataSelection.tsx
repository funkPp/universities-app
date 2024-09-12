import { useState, useMemo, useEffect } from "react";
import { ChangeEvent } from "react";
import ListHanding from "./ListHanding";
import styles from "./DataSelection.module.css";
import { IUniversity, RootState, AppDispatch } from "../types";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loadingAction, successfulAction, errorAction } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const countries = ["France", "Panama", "Russian Federation"];

// const countries = [
//   "France",
//   "Panama",
//   "Spain",
//   "Belarus",
//   "Russian Federation",
//   "Chile",
//   "Mexico",
// ];
// const sourceUrl = "http://universities.hipolabs.com/search?country=";
const sourceUrl = `http://localhost:3333/search?country=`;
export default function DataSelector() {
  const [country, setСountry] = useState(countries[0]);
  const navigate = useNavigate();
  const isLoadingR = useSelector((state: RootState) => state.data?.isLoading);
  const data = useSelector((state: RootState) => state.data?.respond);
  const error = useSelector((state: RootState) => state.data?.error);
  const dispatch = useAppDispatch();

  function onCountryChange(e: ChangeEvent<HTMLSelectElement>) {
    setСountry(e.target.value);
    navigate(`/${country}`);
  }
  const url = sourceUrl + country;

  useEffect(() => {
    dispatch(loadingAction());
    let ignore = false;

    getData(url)
      .then((data) => {
        if (!ignore) {
          data = addIdForData(data);
          dispatch(successfulAction(data));
        }
      })
      .catch((err) => {
        if (err instanceof Error) {
          dispatch(errorAction(err.message));
        }
      });

    return () => {
      ignore = true;
    };
  }, [url, dispatch]);

  const renderSelect = useMemo(
    () => (
      <select value={country} onChange={onCountryChange}>
        {countries.map((country, index) => (
          <option key={country + index} value={country}>
            {country}
          </option>
        ))}
      </select>
    ),
    [country]
  );

  return (
    <>
      <div className="container">
        <label>Выберите страну: {renderSelect} </label>
        <span>{isLoadingR && " loading..."}</span>

        {error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <ListHanding
            items={data as IUniversity[]}
            isLoading={isLoadingR as boolean}
          />
          // <Routes>
          //   <Route
          //     path="/:country/*"
          //     element={
          //       <ListHanding
          //         items={data as IUniversity[]}
          //         isLoading={isLoadingR as boolean}
          //       />
          //     }
          //   />
          // </Routes>
        )}
      </div>
    </>
  );
}

async function getData(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    });

    //из-за CORS не поймаем никогда ошибку 404 ???
    if (!response.ok) {
      const message = `Произошла ошибка: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }
    const data = response.json();
    return data;
  } catch (err) {
    console.log("***ERROR", err);
    const message = `Произошла ошибка: :(`;
    throw new Error(message);
  }
}

function addIdForData(data: IUniversity[]) {
  const result = data.map((univer: IUniversity, index: number) => {
    const idLocal = index;
    return { ...univer, idLocal };
  });
  return result;
}
