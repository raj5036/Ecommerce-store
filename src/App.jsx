import './App.css'

import React, { useState } from 'react'
import { closestCorners, DndContext } from '@dnd-kit/core'
import Header from './components/Header/Header'
import ProductList from './components/ProductList/ProductList'
import ProductsListColumn from './components/ProductsListColumn/ProductsListColumn'
import { arrayMove } from '@dnd-kit/sortable'

function App() {
  const [products, setProducts] = useState([
    {
        "id": 77,
        "title": "Fog Linen Chambray Towel - Beige Stripe",
        "variants": [
            {
                "id": 1,
                "product_id": 77,
                "title": "XS / Silver",
                "price": "49"
            },
            {
                "id": 2,
                "product_id": 77,
                "title": "S / Silver",
                "price": "49"
            },
            {
                "id": 3,
                "product_id": 77,
                "title": "M / Silver",
                "price": "49"
            }
        ],
        "image": {
            "id": 266,
            "product_id": 77,
            "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1"
        }
    },
    {
        "id": 80,
        "title": "Orbit Terrarium - Large",
        "variants": [
            {
                "id": 64,
                "product_id": 80,
                "title": "Default Title",
                "price": "109"
            }
        ],
        "image": {
            "id": 272,
            "product_id": 80,
            "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1"
        }
    }
  ])

  const getProductIndex = (id) => products.findIndex((product) => product.id == id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setProducts((products) => {
      const originalPos = getProductIndex(active.id);
      const newPos = getProductIndex(over.id);

      return arrayMove(products, originalPos, newPos);
    });
  };

  return (
    <React.Fragment>
      <Header />
      <div className='productListContainer'>
        <h1 className='listHeader'>Add products</h1>
        <div className='listSubHeader'>
          <div className='subHeaderItem'>Product</div>
          <div className='subHeaderItem'>Discount</div>
        </div>
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <ProductsListColumn products={products}/>
        </DndContext>
        {/* <DndContext collisionDetection={closestCorners}>
          <ProductList id="productList"/>
        </DndContext> */}
      </div>
    </React.Fragment>
  )
}

export default App
