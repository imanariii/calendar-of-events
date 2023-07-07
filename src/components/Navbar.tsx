import {Layout, Menu, Row} from "antd";
import {FC} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";


const Navbar: FC = () => {
    const {logout} = useActions()
    const {isAuth, user} = useTypedSelector(state => state.auth)
    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ?
                <>
                    <div style={{color: 'white', marginRight: '1rem'}}>
                        {user.username}
                    </div>
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item
                            onClick={logout}
                        >
                            Выйти
                        </Menu.Item>
                    </Menu>
                </> :
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        Логин
                    </Menu>
                }
            </Row>
        </Layout.Header>
    )
}

export default Navbar;