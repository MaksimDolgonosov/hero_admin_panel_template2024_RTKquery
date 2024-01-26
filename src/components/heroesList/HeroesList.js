import { useHttp } from '../../hooks/http.hook';
import { createSelector } from 'reselect';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAll as selectAllHeroes } from '../../reducers/heroesSlice';
import { heroDeleted } from '../../reducers/heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import { fetchHeroes } from '../../reducers/heroesSlice';
import { useGetHeroesQuery } from '../../api/apiSlice';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const { data: heroes = [], error, isLoading } = useGetHeroesQuery();
    console.log(heroes);
    const filteredHeroesSelector = createSelector(
        // (state) => console.log(state),
        (state) => state.filters.activeFilter,
        // (state) => state.heroes.heroes,
        selectAllHeroes,
        (filter, heroes) => {
            if (filter === "all") {
                return heroes
            } else {
                return heroes.filter(hero => hero.element === filter)
            }
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    //const { activeFilter } = useSelector(state => state.filters);

    //console.log(activeFilter);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes())
        // dispatch(heroesFetching());
        // request("http://localhost:3001/heroes")
        //     .then(data => dispatch(heroesFetched(data)))
        //     .catch(() => dispatch(heroesFetchingError))

        // eslint-disable-next-line
    }, []);


    const onDelete = (id) => {
        dispatch(heroDeleted(id));
        request("http://localhost:3001/heroes/" + id, "DELETE");
    }


    if (isLoading) {
        return <Spinner />;
    } else if (error) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
        })
    }
    // const filteredHeroes = activeFilter === "all" ? heroes : heroes.filter(hero => hero.element === activeFilter);
    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;