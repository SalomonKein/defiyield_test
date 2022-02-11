import React from 'react'
import { useParams } from 'react-router-dom';
import cn from './NewsCommentsList.module.scss'

export default function NewsCommentsList() {
  const { id } = useParams() 
  return (
    <div className={cn.container}>
      <h1>NewsCommentsList</h1>
      <h2> This page should contain a commentary on the news with the ID: {id}</h2>
    </div>
  )
}
