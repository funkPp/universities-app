import { useEffect, useState } from "react";
import { RootState } from "../types";
import { useSelector } from "react-redux";
import { redirect, useNavigate, useParams } from "react-router-dom";
import styles from "./Delete.module.css";
import { urlApi } from "./DetailsForm";
import { useAppDispatch } from "./DataSelection";
import { deleteFormAction, errorAction } from "../redux/actions";

export default function Delete() {
  const dispatch = useAppDispatch();
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const initState = {
    id: "p",
    name: "",
    web_pages: [""],
    country: "",
  };
  const [details, setDetails] = useState(initState);

  const univer = useSelector((state: RootState) =>
    state.data?.respond.find((u) => u.id === id)
  );

  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      e.preventDefault();
    });
  }, []);

  useEffect(() => {
    if (univer) {
      setDetails({
        ...details,
        id: univer.id,
        name: univer.name,
        web_pages: univer.web_pages,
        country: univer.country,
      });
    }
  }, [univer]);
  if (!univer) return <div>Выберите университет перед удалением!</div>;

  async function handleClickYes() {
    const method = "delete";
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
        dispatch(deleteFormAction(details.id));
        navigate(`/`);
      }
    } catch {
      dispatch(
        errorAction("Ошибка при удалении на сервере! -> cd src -> node api.js)")
      );
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <table>
          <tbody>
            <tr>
              <span>Удалить {details.name}?</span>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td>
                <button className={styles.button} onClick={handleClickYes}>
                  Да
                </button>
              </td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => navigate(`/details/${details.id}/view`)}
                >
                  Нет
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
