//import { heroesFetching, heroesFetched, heroesFetchingError } from "../reducers/heroesSlice";
import { filtersAdded } from "../reducers/filtersSlice";

// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError))
// }

export const fetchFilters = (request) => (dispatch) => {
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersAdded(data)))
}


// export const filtersAdded = (filters) => {
//     return {
//         type: 'FILTERS_ADDED',
//         payload: filters
//     }
// }

// export const activeFiltersAdded = (filter) => {
//     return {
//         type: 'ACTIVE_FILTER_ADDED',
//         payload: filter
//     }
// }
// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroAdded = (hero) => {
//     return {
//         type: 'HERO_ADDED',
//         payload: hero
//     }
// }

// export const heroDeleted = (heroID) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: heroID
//     }
// }

