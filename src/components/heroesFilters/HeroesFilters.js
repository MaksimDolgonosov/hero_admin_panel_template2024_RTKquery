
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useSelector, useDispatch } from "react-redux";
//import { activeFiltersAdded } from "../../actions";
import { activeFiltersAdded, selectAll } from "../../reducers/filtersSlice";
import store from "../../store";
const HeroesFilters = () => {
    const {  activeFilter } = useSelector(state => state.filters);
    //const filters = useSelector(selectAll);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    const onActive = (filter) => {
        dispatch(activeFiltersAdded(filter))
    }

    const renderFilters = (filters) => {

        return filters.map(filter => {
            switch (filter.name) {
                case "fire":
                    return <button
                        data-element={filter.name}
                        key={filter.id}
                        onClick={() => onActive(filter.name)}
                        className={"btn btn-danger" + (activeFilter === filter.name ? " active" : "")}>Огонь</button>
                case "water":
                    return <button data-element={filter.name} key={filter.id} onClick={() => onActive(filter.name)} className={"btn btn-primary"+ (activeFilter === filter.name ? " active" : "")}>Вода</button>
                case "wind":
                    return <button data-element={filter.name} key={filter.id} onClick={() => onActive(filter.name)} className={"btn btn-success"+ (activeFilter === filter.name ? " active" : "")}>Ветер</button>
                case "earth":
                    return <button data-element={filter.name} key={filter.id} onClick={() => onActive(filter.name)} className={"btn btn-secondary"+ (activeFilter === filter.name ? " active" : "")}>Земля</button>
                default:
                    return <button data-element={filter.name} key={filter.id} onClick={() => onActive(filter.name)} className={"btn btn-outline-dark"+ (activeFilter === filter.name ? " active" : "")}>Все</button>
            }

        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilters(filters)}
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;