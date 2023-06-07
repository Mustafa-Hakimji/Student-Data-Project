import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Error from './Components/404Error';
import Students from './Components/Students/Students'
import Class1 from './Components/Students/Classes/Class1'
import Class2 from './Components/Students/Classes/Class2'
import Class3 from './Components/Students/Classes/Class3'
import Class4 from './Components/Students/Classes/Class4'
import Class5 from './Components/Students/Classes/Class5'
import Class6 from './Components/Students/Classes/Class6'
import Class7 from './Components/Students/Classes/Class7'
import Class8 from './Components/Students/Classes/Class8'
import Class9 from './Components/Students/Classes/Class9'
import Class10 from './Components/Students/Classes/Class10'
import Class11 from './Components/Students/Classes/Class11'
import Class12 from './Components/Students/Classes/Class12'
import ClassNursary from './Components/Students/Classes/ClassNursary'
import ClassLKG from './Components/Students/Classes/ClassLKG'
import ClassUKG from './Components/Students/Classes/ClassLUKG'
import AddStudent from './Components/Students/AddStudent';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/students' element={<Students/>} />
        <Route path='/nursary' element={<ClassNursary/>} />
        <Route path='/lkg' element={<ClassLKG/>} />
        <Route path='/ukg' element={<ClassUKG/>} />
        <Route path='/class-1' element={<Class1/>} />
        <Route path='/class-2' element={<Class2/>} />
        <Route path='/class-3' element={<Class3/>} />
        <Route path='/class-4' element={<Class4/>} />
        <Route path='/class-5' element={<Class5/>} />
        <Route path='/class-6' element={<Class6/>} />
        <Route path='/class-7' element={<Class7/>} />
        <Route path='/class-8' element={<Class8/>} />
        <Route path='/class-9' element={<Class9/>} />
        <Route path='/class-10' element={<Class10/>} />
        <Route path='/class-11' element={<Class11/>} />
        <Route path='/class-12' element={<Class12/>} />
        <Route path='/add-student' element={<AddStudent />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
