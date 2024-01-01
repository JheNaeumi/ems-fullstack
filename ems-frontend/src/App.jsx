import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmpComponent from './components/listEmpComponent'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
function App() {


  return (
    <>
    <BrowserRouter >
      <HeaderComponent/>
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path='/' element = {<ListEmpComponent/>}>
          </Route>
          {/* // http://localhost:3000/employees */}
          <Route path='/employees' element={<ListEmpComponent/>}></Route>
          <Route path='/add-employee' element = {<EmployeeComponent/>}></Route>
          <Route path='/edit-employee/:id' element = {<EmployeeComponent/>}></Route>
        </Routes>
         
      <FooterComponent/>
    </BrowserRouter>
    </>
  )
}

export default App
