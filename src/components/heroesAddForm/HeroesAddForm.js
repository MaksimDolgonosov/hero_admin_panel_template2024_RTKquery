
import { useDispatch } from "react-redux";
//import { useSelector } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
// import {  filtersAdded } from "../../actions";
import { fetchFilters, selectAll as selectAllFilters } from "../../reducers/filtersSlice";
import { heroAdded } from "../../reducers/heroesSlice";
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import store from '../../store';
import { useAddHeroMutation } from "../../api/apiSlice";
import { useGetFiltersQuery } from "../../api/apiFilters";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    //const { filters } = useSelector(state => state.filters);
    //const filters = useSelector(selectAllFilters) ;

    const { data: filters = [] } = useGetFiltersQuery();
    //const filters = selectAllFilters(store.getState())
    //const { request } = useHttp();

    const [updatePost, { isLoading }] = useAddHeroMutation();
    // useEffect(() => {
    //     // request("http://localhost:3001/filters")
    //     //     .then(filters => dispatch(fetchFilters()))
    //     //     .catch(error => console.log(error))
    //     dispatch(fetchFilters());
    //     // eslint-disable-next-line
    // }, [])

    const dispatch = useDispatch();
    const [hero, setHero] = useState({
        id: "",
        name: "",
        description: "",
        element: "all",
    })

    const createHero = (e) => {
        e.preventDefault();
        const heroID = uuidv4();
        const newHerro = { ...hero, id: heroID };
        dispatch(heroAdded(newHerro));
        updatePost(newHerro).unwrap()
        // request("http://localhost:3001/heroes", "POST", JSON.stringify(newHerro));
        setHero({
            id: "",
            name: "",
            description: "",
            element: "all",
        })
    }

    const renderFilters = (filters) => {
        return filters.map(filter => {
            switch (filter.name) {
                case "fire":
                    return <option value={filter.name} key={filter.id}>Огонь</option>
                case "water":
                    return <option value={filter.name} key={filter.id}>Вода</option>
                case "wind":
                    return <option value={filter.name} key={filter.id}>Ветер</option>
                case "earth":
                    return <option value={filter.name} key={filter.id}>Земля</option>
                default:
                    return <option value={filter.name} key={filter.id}>Я владею элементом...</option>
            }

        })
    }


    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    //onChange={(e) => setHero({ name: e.target.value, description: null, element: null })}
                    onChange={(e) => setHero({ ...hero, ...{ name: e.target.value } })}
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={hero.name} />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={(e) => setHero({ ...hero, ...{ description: e.target.value } })}
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    value={hero.description} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    onChange={(e) => setHero({ ...hero, ...{ element: e.target.value } })}
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={hero.element}>
                    {renderFilters(filters)}
                    {/* <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                </select>
            </div>

            <button onClick={createHero} type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;