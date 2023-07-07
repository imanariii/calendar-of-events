import {AuthActionEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user: IUser):SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean):SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean):SetLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: payload}),
    setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            const response = await UserService.getUsers()
            const mockUser = response.data.find(user=> user.username === username  && user.password === password)
            if(mockUser) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('username', mockUser.username)
                dispatch(AuthActionCreators.setUser(mockUser))
                dispatch(AuthActionCreators.setIsAuth(true))
            } else {
                dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
            }
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при авторизации'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setIsAuth(false))
        dispatch(AuthActionCreators.setUser({} as IUser))
    }
}