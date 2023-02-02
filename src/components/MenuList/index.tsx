import { Menu } from '../../types/Menu'
import ItemList from '../ItemList'

interface IMenuList {
  items: Menu[]
}

const MenuList = ({ items }: IMenuList) => {
  return (
    <div className="container my-4 mx-auto">
      <div className="-mx-1 grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:-mx-4">
        {items.length ? (
          items.map((props: Menu) => <ItemList key={props.id} {...props} />)
        ) : (
          <p>Nenhum item encontrado para o cardápio.</p>
        )}
      </div>
    </div>
  )
}

export default MenuList
