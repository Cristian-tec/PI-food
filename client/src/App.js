
import { Route } from 'react-router-dom'
import './App.css';
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateRecipe from './components/CreateRecipe'
import RecipeDetail from './components/RecipeDetail'

function App() {
  return (
    <div className="App">
    {/*   <h2>Henry Food</h2> */}

      <Route exact path="/" component={LandingPage} />

      <Route exact path="/home" render={() => <Home />} />
{/*   <Route exact path="/home" render={() => <Navbar />} /> */}
      <Route exact path="/createrecipe" render={() => <CreateRecipe />} />
      <Route exact path="/home/:id" component={Home}></Route>
      <Route exact path="/recipedetail/:id" component={RecipeDetail}></Route>


      {/*   <Route exact path="/about" render={() => <About info="Esta es la info" />} />

      <Route path="/userdetail/:id" component={UserDetail}></Route> */}


    </div>
  );
}

export default App;
