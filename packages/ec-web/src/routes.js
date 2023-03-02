import IndexPage from './pages/HomePage/IndexPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ShopPage from './pages/ShopPage/ShopPage';
import AdminPage from './pages/AdminPage/MainPage';
// import { withRouter } from "react-router";
// import Footer from './components/Footer';
// import Header from './components/Header';

const routes=[
    {
        path:'/', 
        exact: true, 
        main:()=><IndexPage />
    },
    {
        path:'/shop/:filter', 
        exact: false, 
        main:({match,history})=><ShopPage match={match}  history={history}/>
    },
    {
        path:'/shop', 
        exact: true, 
        main:({match,history})=><ShopPage/>
    },
    {
        path:'/about', 
        exact: false, 
        main:({history})=><AboutPage/>
    },
    {
        path:'/contact', 
        exact: false, 
        main:()=><ContactPage/>
    },
    {
         path:'/admin', 
         exact: false, 
         main:()=><AdminPage />
    },
];
export default routes;