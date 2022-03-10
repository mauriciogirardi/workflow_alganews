import { NavLink } from 'react-router-dom';
import * as S from './styles';

export const Navbar = () => {
    return (
        <S.Nav>
            <ul>
                <li>
                    <NavLink to="/">início</NavLink>
                </li>
                <li>
                    <NavLink to="/editores">editores</NavLink>
                </li>
                <li>
                    <NavLink to="/posts/criar">novo post</NavLink>
                </li>
                <li>
                    <NavLink to="/calendar">calendario</NavLink>
                </li>
            </ul>
        </S.Nav>
    );
};
