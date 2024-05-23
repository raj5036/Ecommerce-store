import './App.css'

import React, { useEffect } from 'react'
import { closestCorners, DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import Header from './components/Header/Header'
import ProductsListColumn from './components/ProductsListColumn/ProductsListColumn'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import AddProductButton from './components/AddProductButton/AddProductButton'
import { useDispatch } from 'react-redux'
import { addProduct } from './redux/state/AllProductsSlice'
import { addSelectedProduct } from './redux/state/SelectedProductsSlice'
import { useSelector } from 'react-redux'
import { updateAllProducts } from './redux/state/SelectedProductsSlice'

const FetchedProducts = [
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
]

function App() {
  const selectedProducts = useSelector(state => state.selectedProducts.products)
  const dispatch = useDispatch()
  
  useEffect(() => {
    FetchedProducts.forEach(product => {
      dispatch(addProduct(product))
    })
  }, []) 

  const getProductIndex = (id) => selectedProducts.findIndex((product) => product.id == id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    const originalPos = getProductIndex(active.id);
    const newPos = getProductIndex(over.id);
    dispatch(updateAllProducts(arrayMove(selectedProducts, originalPos, newPos)))
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 350,
      }
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 900,
        distance: 8,
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 900,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const onAddProduct = () => {
    dispatch(addSelectedProduct({
      id: `${Number.MIN_SAFE_INTEGER}`,
      title: '',
      variants: [],
      image: null
    }))
  }

  return (
    <React.Fragment>
      <Header />
      <div className='productListContainer'>
        <h1 className='listHeader'>Add products</h1>
        <div className='listSubHeader'>
          <div className='subHeaderItem'>Product</div>
          <div className='subHeaderItem'>Discount</div>
        </div>
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
          <ProductsListColumn />
        </DndContext>
      </div>
      <AddProductButton onAddProduct={onAddProduct}/>
    </React.Fragment>
  )
}

export default App
