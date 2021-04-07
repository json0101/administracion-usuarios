import React,{useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import UpdateRole from '../components/roles/UpdateRole';
import ListTableRole from '../components/roles/ListTableRole';
import ListTableUser from '../components/users/ListTableUser';
import UpdateUser from '../components/users/UpdateUser';
import Navbar from '../components/nav/Navbar';
import Header from '../components/nav/Header';
import { UpdateAplication } from '../components/aplications/UpdateAplication';
import { ListTableAplications } from '../components/aplications/ListTableAplications';
import UpdateScreen from '../components/screens/UpdateScreen';
import ListTableScreen from '../components/screens/ListTableScreen';

export default function DashboardRoutes() {

    const [showMenu, setShowMenu] = useState(true);

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <div className="layout-container">            
                <Header onToggleMenu={handleMenuToggle}>
                </Header>

                <Navbar showMenu={showMenu}/>
                
                
                <aside>
                    <Switch>                        
                        <Route path="/" exact component={ListTableAplications}>
                        </Route>
                        <Route path="/aplications/create" exact component={UpdateAplication}>
                        </Route>
                        <Route path="/aplications" exact component={ListTableAplications}>
                        </Route>
                        <Route path="/aplications/update/:id" exact component={UpdateAplication}>
                        </Route>
                        <Route path="/screens/create" exact component={UpdateScreen}>
                        </Route>
                        <Route path="/screens" exact component={ListTableScreen}>
                        </Route>
                        <Route path="/screens/update/:id" exact component={UpdateScreen}>
                        </Route>
                        <Route path="/users/create" exact component={UpdateUser}>
                        </Route>
                        <Route path="/users" exact component={ListTableUser}>
                        </Route>
                        <Route path="/users/update/:id" exact component={UpdateUser}>
                        </Route>
                        <Route path="/roles" exact component={ListTableRole}>
                        </Route>
                        <Route path="/roles/create" exact component={UpdateRole}>
                        </Route>
                        <Route path="/roles/update/:id" exact component={UpdateRole}>
                        </Route>
                    </Switch>
                </aside>
                <footer>
                    <p>SellAndCharge</p>
                </footer>
            </div>
        </>
    );
}