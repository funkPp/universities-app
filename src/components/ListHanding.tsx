import { MouseEvent, useMemo } from "react";
import List from "./List";
import Paginator from "./Paginator";
import { useAppDispatch } from "./DataSelection";
import { IUniversity, RootState } from "../types";
import { useSelector } from "react-redux";
import { changePageAction } from "../redux/actions";

interface IListHandingProps {
  items: IUniversity[];
  isLoading: boolean;
}
const itemsPerPage = 20;

export default function ListHanding({ items, isLoading }: IListHandingProps) {
  // const [currentPage, setCurrentPage] = useState(0);
  const currentPage = useSelector(
    (state: RootState) => state.data?.currentPage as number
  );

  const dispatch = useAppDispatch();

  const itemOffset = currentPage * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = useMemo(
    () => (items ? items.slice(itemOffset, endOffset) : []),
    [items, itemOffset, endOffset]
  );
  const pageCount = items ? Math.ceil(items.length / itemsPerPage) : 0;

  function handlePageClick(e: MouseEvent<HTMLButtonElement>): void {
    if ((e.target as HTMLButtonElement).id === "prev") {
      if (currentPage > 0) dispatch(changePageAction(currentPage - 1));
      return;
    }

    if ((e.target as HTMLButtonElement).id === "next") {
      const pageCount = Math.ceil(
        (items as IUniversity[])?.length / itemsPerPage
      );
      if (currentPage < pageCount - 1)
        dispatch(changePageAction(currentPage + 1));
      return;
    }

    const nextPage = Number((e.target as HTMLButtonElement).id);
    dispatch(changePageAction(nextPage));
  }

  return (
    <>
      <List universities={currentItems} isLoading={isLoading} />
      <hr />
      <Paginator
        currentPage={currentPage}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
      />
    </>
  );
}
