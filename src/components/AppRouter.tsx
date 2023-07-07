import {Routes, Route} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state=>state.auth)
    const navigate = useNavigate();

    useEffect(()=>{
        isAuth ?
            navigate(RouteNames.EVENT) :
            navigate(RouteNames.LOGIN)
    }, [isAuth, navigate])
    return (
        isAuth ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route key={route.path}
                           path={route.path}
                           index={route.exact}
                           Component={route.component}
                    />
                )}
            </Routes> :
            <Routes>
                {publicRoutes.map(route =>
                    <Route key={route.path}
                           path={route.path}
                           index={route.exact}
                           Component={route.component}
                    />
                )}
            </Routes>
    )
}

export default AppRouter;