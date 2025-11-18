import React from 'react'
import ProductPage from './product/page'
import Banner from '../../banner/page'
import Navbar from '@/shared/Navabr/Navbar'

export default function Homes() {
  return (
    <div>
      <ProductPage/>
      <Banner/>
      <Navbar/>
    </div>
  )
}
