import {Route, Routes} from "react-router-dom";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import NavigationBar from "./routes/navigation-bar/navigation-bar.component";

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<NavigationBar/>}>
                <Route index path='/' element={<Home/>}></Route>
                <Route path='/shop' element={<Shop/>}></Route>
            </Route>
        </Routes>
    )
}

export default App;