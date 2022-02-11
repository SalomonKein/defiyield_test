import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNews } from '../api';
import { setNews } from '../redux/actions'
import { NEWS_COMMENTS } from '../utils/const';
import cn from './NewsList.module.scss'

export default function NewsList() {
  const [curentPage, setCurentPage] = useState(1)
  const [fetching, setFetching] = useState([true])
  const [isSort, setIsSort] = useState(true)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const news = useSelector(state => state.news)


  useEffect(() => {
    if (fetching) {
      getNews(curentPage)
        .then(data => {
          dispatch(setNews(data))
          setCurentPage(prevState => prevState + 1)
        })
        .finally(() => setFetching(false))
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && curentPage <= 10)
      setFetching(true)
  }

  const onCklikHendlerHeader = (e) => {
    const elem = e.target.textContent.toLowerCase()
    news.sort(function (a, b) {
      let nameA = a[elem], nameB = b[elem]
      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
      return 0
    })
    setIsSort(!isSort)
    return news
  }

  const onCklikHendlerBtn = () => {
    news.sort(function (a, b) {
      return (a.time - b.time)
    })
    setIsSort(!isSort)
    return news
  }



  return (

    <div className={cn.container}>
      <table className={cn.table}>
        <thead>
          <tr>
            <th className={cn.date} onClick={onCklikHendlerHeader}>Time</th>
            <th onClick={onCklikHendlerHeader}>Title</th>
            <th className={cn.domain} onClick={onCklikHendlerHeader}>Domain</th>
          </tr>
        </thead>
        <tbody>
          {news.map(({ id, time, title, domain }) =>

            <tr key={id * Math.random()}>
              <td className={cn.date} onClick={() => navigate(NEWS_COMMENTS + '/' + id)} >{new Date(time).toString().slice(0, 25)}</td>
              <td className={cn.cell} onClick={() => navigate(NEWS_COMMENTS + '/' + id)} >{title}</td>
              <td className={cn.domain} onClick={() => navigate(NEWS_COMMENTS + '/' + id)}>{domain}</td>
            </tr>

          )}
        </tbody>
      </table>
      <button className={cn.buttonSort} onClick={onCklikHendlerBtn}>Sort by date</button>
    </div>
  )
}
