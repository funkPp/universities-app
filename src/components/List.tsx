import { IUniversity } from "../types";
import { useState } from "react";
import { clsx } from "clsx";
import DetailsForm from "./DetailsForm";
import styles from "./List.module.css";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import DeleteForm from "./Delete";

interface IListProps {
  universities: IUniversity[];
  isLoading: boolean;
}

export default function List({ universities, isLoading }: IListProps) {
  const [idDetails, setIdDetails] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = (id: IUniversity["id"]) => {
    navigate(`/details/${id}/view`);
    setIdDetails(id);
  };

  let renderListItem;
  if (universities) {
    renderListItem = universities.map((univer, index) => (
      <li
        className={clsx(isLoading ? styles.Loading : styles.liHover)}
        key={univer.name + univer.id}
        //onClick={() => navigate(`/details/${univer.id}/view`)}
        onClick={() => handleClick(univer.id)}
      >
        {index + 1}
        {". "}
        {univer.name}
      </li>
    ));
  }

  return (
    <div className="listAndDetails">
      <ul>{renderListItem}</ul>
      <div className="details_container">
        Подробная информация:
        <nav>
          <NavLink
            to={`details/${idDetails}/edit`}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Edit
          </NavLink>
          <NavLink
            to={`details/new`}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Add
          </NavLink>
          <NavLink
            to={`details/${idDetails}/del`}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Del
          </NavLink>
        </nav>
        <hr />
        <br />
        <Routes>
          <Route path="/details/:id/view" element={<DetailsForm />} />
          <Route path="/details/new" element={<DetailsForm />} />
          <Route path="/details/:id/edit" element={<DetailsForm />} />
          <Route path="/details/:id/del" element={<DeleteForm />} />
        </Routes>
      </div>
    </div>
  );
}
