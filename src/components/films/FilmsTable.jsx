import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllFilterItems, getListOfAllFilmsWithPagination, setPage } from "../../redux/slices/FilmSlice";
import FlimModal from "../FlimModal";

const FilmsTable = () => {
  const dispatch = useDispatch();
  const { films, page, total, totalPages, loading, error, filterComponents } = useSelector((state) => state.film)
  const [filter, setFilter] = useState({
    category: "",
    language: "",
    release_year: 0,
    actor: ""
  })
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    dispatch(getListOfAllFilmsWithPagination({ page, limit: 10, fData: filter }))
    dispatch(getAllFilterItems())
  }, [dispatch, filter, page])

  // useEffect(() => {
  // }, [dispatch])

  const handleChange = (e, name) => {
    // console.log(e.target.name)
    console.log(e.target.value)
    setFilter({
      ...filter,
      [name]: e.target.value
    })
  }

  const handleOpen = (id) => {
    setOpen(true);
    setActiveId(id);
  }

  const handleModalClose = () => {
    setOpen(false);
  }

  // console.log(filterComponents)
  // console.log(page)
  // console.log(films)
  console.log(activeId)

  return (
    <div>
      <div>
        <h1>Films Table</h1>
      </div>

      <div className="w-full flex justify-between mb-4">
        <select name="" onChange={(e) => handleChange(e, "category")} className="border rounded-md">
          <option value={0}>Select Category</option>
          {
            filterComponents.category.map((item) => {
              // console.log(item)
              return <option key={item.category_id} value={item.name}>{item.name}</option>
            })
          }
        </select>

        <select name="" onChange={(e) => handleChange(e, "language")} className="border rounded-md">
          <option value={0}>Select language</option>
          {
            filterComponents.language.map((item) => {
              // console.log(item)
              return <option key={item.language_id} value={item.name}>{item.name}</option>
            })
          }
        </select>

        <select name="" onChange={(e) => handleChange(e, "actor")} className="border rounded-md">
          <option value={0}>Select actor</option>
          {
            filterComponents.actor.map((item) => {
              // console.log(item)
              return <option key={item.actor_id} value={item.first_name}>{item.first_name + " " + item.last_name}</option>
            })
          }
        </select>
      </div>

      {/* table part */}
      <div className="w-full p-3 ">
        <table className="w-full bg-amber-100 shadow-md cursor-pointer ">
          <thead>
            <tr className="text-black">
              {
                ["title", "release_year", "language", "length", "replacement_cost", "rating"].map((item) => {
                  return <td key={item} className="p-2">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </td>
                })
              }
            </tr>
          </thead>

          <tbody className="text-black">
            {films.map((item) => {
              return (
                <tr key={item.title} className="p-2" onClick={() => handleOpen(item.film_id)}>
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">{item.release_year}</td>
                  <td className="p-2">{item.language_film_language_idTolanguage.name
                  }</td>
                  <td className="p-2">{item.length}</td>
                  <td className="p-2">{item.replacement_cost}</td>
                  <td className="p-2">{item.rating}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-2">
        <button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1} >{"<- Prev"}</button>
        <span>{page} of {totalPages}</span>
        <button onClick={() => dispatch(setPage(page + 1))} disabled={page === totalPages}>{"Next ->"}</button>
      </div>

      <FlimModal open={open} id={activeId} handleClose={handleModalClose} />

    </div>
  )
}

export default FilmsTable