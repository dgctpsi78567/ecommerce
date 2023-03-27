import React from 'react'
import Jumbotron from '../components/card/Jumbotron';
import CategoryList from '../components/categories/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivels from '../components/home/NewArrivels';
import SubsList from '../components/subs/SubsList';

const Home = () => {

  return (
    <React.Fragment>
      <hr/>
      <h2 className="h2 text-center">
        <Jumbotron text={["Newest Arrivles", "Best Sellers", "Retails Sellers"]} />
      </h2>

      <hr/>
      <h2 className="h2 text-center">Newest Arrivels</h2>
      <hr/>
      <NewArrivels/>  

      <hr/>
      <h2 className="h2 text-center">Best Sellers</h2>
      <hr/>
      <BestSellers/>

      <hr/>
      <h2 className="h2 text-center">Categories</h2>
      <hr/>
      <CategoryList/>

      <hr/>
      <h2 className="h2 text-center">Sub Categories</h2>
      <SubsList/>
      <hr/>


    </React.Fragment>
  )
}

export default Home