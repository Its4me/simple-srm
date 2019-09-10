import { Product } from './../../shared/interfaces';
import { BUSKET_ACTION, BusketUnion } from './basket.action'

const initialState = {
  products: [
    new Product(1, 300, 10, JSON.parse(localStorage.getItem('1')), 
    'Микропроце́ссор — процессор (устройство, отвечающее за выполнение арифметических, логических операций и операций управления, записанных в машинном коде)'),
    new Product(2, 5, 105, JSON.parse(localStorage.getItem('2')), 
    'Карто́фель, или Паслён клубнено́сный (лат. Solánum tuberósum), — вид многолетних клубненосных травянистых растений из рода Паслён (Solanum)'),
    new Product(3, 150, 25, JSON.parse(localStorage.getItem('3')), 
    'Розмари́н (лат. Rosmarinus) — род многолетних вечнозелёных кустарников семейства Яснотковые (Lamiaceae)'),
    new Product(4, 400, 500, JSON.parse(localStorage.getItem('4')), 
    'Nokia Corporation (фин. Nokia Oyj, произносится но́киа) — финская транснациональная компания телекоммуникационного оборудования для мобильных, фиксированных, широкополосных и IP-сетей'),
    new Product(5, 450, 220, JSON.parse(localStorage.getItem('5')), 
    '«Геошто́рм» (англ. Geostorm) — фантастический фильм-катастрофа, полнометражный режиссёрский дебют Дина Девлина.'),
    new Product(6, 175, 750, JSON.parse(localStorage.getItem('6')), 
    'Вселенная Warcraft — вселенная, изначально придуманная для компьютерных игр из серии Warcraft (с англ. — «Военное ремесло»)'),
    new Product(7, 25, 415, JSON.parse(localStorage.getItem('7')), 
    'Пи́цца (итал. pizza) — итальянское национальное блюдо в виде круглой открытой дрожжевой лепёшки')
  ]
}

export function basketReducer(state = initialState, action: BusketUnion) {
  switch (action.type) {

    case BUSKET_ACTION.ADD_PRODUCT: {
      const newProducts: Product[] = editProduct(true, state.products, action.payload)
      return {
        ...state,
        products: [...newProducts]
      }
    }

    case BUSKET_ACTION.DELETE_PRODUCT: {
      const newProducts: Product[] = editProduct(false, state.products, action.payload)
      return {
        ...state,
        products: [...newProducts]
      }
    }

    case BUSKET_ACTION.DELETE_ALL: {
      const newArray = state.products.map((elem) => {
        elem.inBucket = false
        localStorage.setItem(`${elem.id}`, `false`)
        return elem
      })
      return {
        ...state,
        products: [...newArray]
      }
    }

    default: return state
  }
}


function editProduct(inBucket: boolean, state: Product[], id: number): Product[] {
  let newArray: Product[] = state
  newArray = state.map((elem) => {
    if (elem.id == id) {
      elem.inBucket = inBucket
      localStorage.setItem(`${id}`, `${inBucket}`)
    }
    return elem
  })
  return newArray
}
