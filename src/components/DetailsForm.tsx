import { useLocation, useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { useAppDispatch } from "./DataSelection";
import { IUniversity, RootState } from "../types";
import { useSelector } from "react-redux";
import { addFormAction, changeFormAction, errorAction } from "../redux/actions";
import { useEffect, useState, useRef } from "react";
import styles from "./DetailsForm.module.css";
import { countries } from "./DataSelection";

export const urlApi = "http://localhost:3333/form_handler/";

export default function DetailsForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initState = {
    id: "",
    name: "",
    web_pages: [""],
    country: "",
  };
  const [details, setDetails] = useState(initState);
  const [method, setMethod] = useState("");
  const location = useLocation();
  const [errValidationName, setErrValidationName] = useState("");
  const [errValidationWebPage, setErrValidationWebPage] = useState("");

  const { id } = useParams<string>();
  const univer = useSelector((state: RootState) =>
    state.data?.respond?.find((univer) => univer.id === id)
  );

  const path = location.pathname;
  const typePath = path.slice(path.lastIndexOf("/"));

  const isValid = useRef(true);
  const isView = typePath === "/view";

  console.log("***IS VIEW", isView);

  const idLast = useSelector((state: RootState) => state.data?.respond.length);

  useEffect(() => {
    setErrValidationName("");
    setErrValidationWebPage("");
    isValid.current = true;
    if (univer && location.pathname !== "/details/new") {
      const editPayload = {
        ...details,
        id: univer.id,
        name: univer.name,
        web_pages: univer.web_pages,
        country: univer.country,
      };
      setDetails(editPayload);
      console.log("***EDIT PAYLOAD", editPayload);

      setMethod("put");
    } else {
      const payload = {
        ...details,
        id: nanoid(),
        name: "",
        web_pages: [""],
        country: "",
      };

      console.log("***NEW PAYLOAD", payload);
      setDetails(payload);
      setMethod("post");
    }
  }, [univer, location.pathname]); //nanoid()

  function validationForm(): void {
    isValid.current = true;
    if (details.name.length < 3) {
      setErrValidationName("В названии должно быть больше двух символов!");
      isValid.current = false;
    } else setErrValidationName("");

    details.web_pages.forEach((page) => {
      setErrValidationWebPage("");
      if (!page.includes(".")) {
        setErrValidationWebPage("В названии сайта должна быть точка!");
        isValid.current = false;
      }
    });
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log("submit");

    validationForm();
    if (!isValid.current) return;

    try {
      const response = await fetch(urlApi + method, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const res = await response.text();
      if (res === "ok") {
        if (method === "put") {
          dispatch(changeFormAction(details as IUniversity));
          navigate(`/details/${details.id}/view`);
        }
        if (method === "post") {
          const idLocal = idLast;
          dispatch(addFormAction({ ...details, idLocal: idLocal as number }));
        }
      }
    } catch {
      dispatch(
        errorAction(
          "Ошибка при сохранении на сервере! -> cd src -> node api.js"
        )
      );
    }
  };

  const handleChangeCountry = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDetails({ ...details, country: e.currentTarget.value });
  };

  const handleChangeName = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    console.log("****HANDLE CHANGE NAME", e.currentTarget.value);
    setDetails({ ...details, name: e.currentTarget.value });
  };

  const handleChangeWebPages = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDetails({ ...details, web_pages: e.currentTarget.value.split("\n") });
  };

  return (
    <form name="form" id="form">
      <table>
        <tbody>
          <tr>
            <td className={styles.col1}>
              <label>id :</label>
            </td>
            <td>
              <input name="id" disabled value={details.id} />
            </td>
          </tr>
          <tr>
            <td className={styles.col1}>
              <label>Страна :</label>
            </td>
            <td>
              <select
                disabled={isView}
                name="country"
                value={details.country}
                onChange={handleChangeCountry}
              >
                {countries.map((country, index) => (
                  <option key={country + index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <div className={styles.validationError}></div>
            </td>
          </tr>
          <tr>
            <td className={styles.col1}>
              <label>Наименование:</label>
            </td>
            <td>
              <textarea
                className={styles.textarea}
                disabled={isView}
                rows={2}
                name="name"
                value={details.name}
                onChange={handleChangeName}
              />
            </td>
            <td>
              <div className={styles.validationError}>{errValidationName}</div>
            </td>
          </tr>
          <tr>
            <td className={styles.col1}>
              <label>Сайты: </label>
            </td>
            <td>
              <textarea
                className={styles.textarea}
                disabled={isView}
                rows={2}
                name="sites"
                value={details.web_pages.join("\n")}
                onChange={handleChangeWebPages}
              />
            </td>
            <td>
              <div className={styles.validationError}>
                {errValidationWebPage}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {!isValid.current && (
        <div className={styles.validationError}>
          Данные не сохранены, ошибка валидации.
        </div>
      )}
      {!isView && (
        <button
          className={styles.submit}
          onClick={() => navigate(`/details/${details.id}/view`)}
        >
          Cancel
        </button>
      )}
      {!isView && (
        <button className={styles.submit} onClick={handleSubmit}>
          Save
        </button>
      )}
    </form>
  );
}
