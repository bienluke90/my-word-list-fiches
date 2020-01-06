import React from 'react'
import styled from 'styled-components'
import theme from '../styles/mainTheme.js'
import bookIcon from '../assets/book-icon.png'
import {LogoImage, LogoTitle} from './LogoImageTitle.js'
import StyledHeader from './Header.js'
import {StyledNavigation, NavIcon, NavList, ListItem} from './HeaderNavigation.js'
import Dashboard from '../components/Dashboard.js'
import { Provider } from 'react-redux';
import store from '../store';

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    padding: 0 ${theme.gutterWidth};

    @media screen and (min-width: ${theme.device.md}) {
        max-width: ${theme.device.md};
    }

    @media screen and (min-width: ${theme.device.xl}) {
        max-width: ${theme.device.xl};
    }
`

const MainContent = styled.main`
    position: absolute;
    top: calc(${theme.header_mobile_height} + ${theme.gutterWidth});
    left: 0;
    z-index: 0;
    background-color: ${theme.default_content_background};
    width: 100%;
    min-height: 100vh;
    ${({navOpened}) => navOpened && `
        ::after {
                content: " a";
                display: block;
                position: fixed;
                top: ${theme.header_mobile_height};
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 998;
                background-color: rgba(50,80,100,0.75);
            }
    `}
    @media screen and (min-width: ${theme.device.md}) {
        top: calc(${theme.header_desktop_height} + ${theme.gutterWidth});
        ${({navOpened}) => navOpened && `
        ::after {
                content: "";
                display: none;
            }
        `}
    }
`

class Layout extends React.Component {

    state = {
        navOpened: false
    }

    handleNavicon = () => {
        this.setState({
            navOpened: !this.state.navOpened
        })
    }

    handleClick = (e) => {
        const cords = e.target.getBoundingClientRect()
        if(e.clientX < cords.width && e.clientY < cords.height) {
            this.handleNavicon()
        }
    }

    render() {
        const {navOpened} = this.state
        return (
            <Provider store={store}>
                <div onClick={this.state.navOpened ? this.handleClick : null}>
                    <StyledHeader>  
                        <MainContainer>
                            <LogoImage src={bookIcon} alt="Dictionary Icon Logo"/>
                            <LogoTitle> <span>My Word <br /> List Dictionary</span></LogoTitle>
                            <StyledNavigation>
                                <NavIcon navOpened={navOpened} onClick={this.handleNavicon}>
                                </NavIcon>
                                <NavList navOpened={navOpened}>
                                    <ListItem>
                                        <b>#HASH Select</b> <br /> <small>by CATEGORY</small> 
                                    </ListItem>
                                    <ListItem>
                                        <b>#HASH Select</b> <br /> <small>by TIME</small> 
                                    </ListItem>
                                </NavList>
                            </StyledNavigation>
                        </MainContainer>
                    </StyledHeader>
                    <MainContainer>
                        <MainContent navOpened={navOpened}>
                            <Dashboard />
                        </MainContent>
                    </MainContainer>
                </div>
            </Provider>
        )
    }
}

export default Layout