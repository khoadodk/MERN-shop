import React from 'react';

import Jumbotron from '../components/cards/Jumbotron';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import SubList from '../components/subcategory/SubList';

const Home = () => {
  return (
    <>
      <div className='jumbotron text-primary m-0 h1 font-weight-bold text-center '>
        <div>
          <Jumbotron text={["Today's Deal", 'New Arrivals', 'Best Sellers']} />
        </div>
      </div>
      <h4 className='py-3 my-5 display-3 text-center text-secondary'>
        New Arrivals
      </h4>
      <NewArrivals />
      <h4 className='py-3 my-5 display-3 text-center text-secondary'>
        Best Sellers
      </h4>
      <BestSellers />
      <h4 className='py-3 my-5 display-3 text-center text-secondary'>
        Categories
      </h4>
      <CategoryList />
      <h4 className='py-3 my-5 display-3 text-center text-secondary'>
        SubCategories
      </h4>
      <SubList />
    </>
  );
};

export default Home;
