import React from 'react'
import './assets/styles.scss'
import Header from './header'
import Footer from './footer'
import UserTable from './userTable'
import FilmsTable from './components/films/FilmsTable'


function App() {
  return (
    <>
      <Header />
      <div className='main_page_holder'>
        <div className='table_outer_holder'>
          <FilmsTable />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
