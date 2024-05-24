import './App.css'

import React, { useEffect } from 'react'
import { closestCorners, DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import Header from './components/Header/Header'
import ProductsListColumn from './components/ProductsListColumn/ProductsListColumn'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import AddProductButton from './components/AddProductButton/AddProductButton'
import { useDispatch } from 'react-redux'
import { updateAllProducts } from './redux/state/AllProductsSlice'
import { addSelectedProduct } from './redux/state/SelectedProductsSlice'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateAllSelectedProducts } from './redux/state/SelectedProductsSlice'
import { FetchedProducts } from './utils/Data'

function App() {
  const allProducts = useSelector(state => state.allProducts.products)
  const selectedProducts = useSelector(state => state.selectedProducts.products)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!allProducts.length) {
      console.log('called once', allProducts)
      dispatch(updateAllProducts(FetchedProducts))
      // FetchedProducts.forEach(product => {
      //   dispatch(addProduct(product))
      // })
    } 
  }, []) 

  const getProductIndex = (id) => selectedProducts.findIndex((product) => product.id == id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over) return
    if (active.id === over.id) return

    const originalPos = getProductIndex(active.id)
    const newPos = getProductIndex(over.id)
    dispatch(updateAllSelectedProducts(arrayMove(selectedProducts, originalPos, newPos)))
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
    // Check if there is already a ProductItem present in 'selectedProducts'
    const emptyProductItemPresent = selectedProducts.some(product => product.productId == Number.MIN_SAFE_INTEGER)
    if (emptyProductItemPresent) {
      toast.error('Please Select a product before adding new one')
      return
    }
    dispatch(addSelectedProduct({
      id: 0,
      productId: `${Number.MIN_SAFE_INTEGER}`,
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
