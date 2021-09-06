import { Menu, Dropdown } from 'antd';
import { SettingOutlined, CheckOutlined } from '@ant-design/icons';
import styles from "./header.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { Langs, setLangLocalization } from '../../redux/localization-reduser';
import { useLocalization } from '../../utilits/hooks/useLangLoocalization';


export function Header() {

    const currentLang = useSelector((state: any) => state.localizationData.currentLang);
    const langLocalization = useLocalization();
    const menuLocalization = useLocalization().header.menu;
    const dispatch = useDispatch();

    const { SubMenu } = Menu;

    const menu = (
        <Menu>
            <SubMenu title={ menuLocalization.language } key="Language">
                <Menu.Item onClick={ () => dispatch(setLangLocalization(Langs.RU)) } key={Langs.RU} >
                    { menuLocalization.russian }
                    { currentLang === Langs.RU && <CheckOutlined style={{paddingLeft: "5px"}} /> }
                </Menu.Item>
                <Menu.Item onClick={ () => dispatch(setLangLocalization(Langs.EN)) } key={Langs.EN} >
                    { menuLocalization.english }
                    { currentLang === Langs.EN && <CheckOutlined style={{paddingLeft: "5px"}} /> }
                </Menu.Item>
            </SubMenu>
        </Menu>
    )

    return (
        <header className={styles.header}>
            <h1 style={{paddingTop: '25px'}}> {langLocalization.header.mainTitle} </h1>
            <Dropdown overlay={menu} className={styles.headerMenu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <SettingOutlined style={{fontSize: "2em"}} />
                </a>
            </Dropdown>
        </header>
    )
}