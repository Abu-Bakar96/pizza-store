import React from 'react'
import qs from 'qs'
import { useSelector } from 'react-redux';



import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components'

import {list} from '../components/Sort';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const {items, status} = useSelector(selectPizzaData)

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)




  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    )
}

  // Если изменили параметры и был первый рендер

  React.useEffect(() => {

    if(isMounted.current) {

      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
  
      })
  
      navigate(`/?${queryString}`)

    }
    
    isMounted.current = true

  }, [categoryId, sort.sortProperty, currentPage])

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find(obj => obj.sortProperty === params.sortBy)


      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || list[0]

      }))
      isSearch.current = true
    }
  },[])

  // Если был первый рендер, то запрашиваем пиццы 
  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false

  }, [categoryId, sort.sortProperty, searchValue, currentPage])



  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  

  return (
    <div className="container">

      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value = {sort} />

      </div>
      <h2 className="content__title">Все пиццы</h2>

      { status === 'error' ?
       (<div className="content__error-info">
        <h2>Произошла ошибка 😕</h2>
        <p>
          К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.
        </p>
      </div>
      ) : (
      <div className="content__items">

        {
        status === 'loading'
        ? skeletons
        : pizzas
        }

        </div>)}
      
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home