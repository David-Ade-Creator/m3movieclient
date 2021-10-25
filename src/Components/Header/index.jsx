import React from 'react';

function PageHeader({children}) {
    const [isNavbarOpen, setNavbarOpen] = React.useState(false);

    const toggleNavbar = () =>{
        setNavbarOpen(!isNavbarOpen)
    }

    return (
        <React.Fragment>
        <header class="header" id="header">
            <div className="header_container container">

            <div class="header__img">
                <img src="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg" alt=""/>
            </div>

            <div class="header__toggle">
                <i class='bx bx-menu' id="header-toggle" onClick={toggleNavbar}></i>
            </div>

            
            </div>
        </header>
        <div class={`l-navbar ${isNavbarOpen ? "show" : ""}`} id="nav-bar">
            <nav class="nav">
                <div>
                    <a href="/" class="nav__logo">
                        <i class='bx bx-layer nav__logo-icon'></i>
                        <span class="nav__logo-name">M3Movies</span>
                    </a>

                    <a href="/" class="nav__link">
                    <i class='bx bx-bookmark nav__icon' ></i>
                            <span class="nav__name">Favourites</span>
                        </a>

                    <div class="nav__list">
                        <a href="/" class="nav__link active">
                      
                            <span class="nav__name">Home</span>
                        </a>

                        <a href="/" class="nav__link">
                           
                            <span class="nav__name">Anime</span>
                        </a>
                        
                        <a href="/" class="nav__link">
                          
                            <span class="nav__name">Dramas</span>
                        </a>

                        <a href="/" class="nav__link">
                          
                            <span class="nav__name">Thrillers</span>
                        </a>

                        <a href="/" class="nav__link">
                            <span class="nav__name">Independent Films</span>
                        </a>

                        <a href="/" class="nav__link">
                            <span class="nav__name">Horror Films</span>
                        </a>
                    </div>
                </div>

                <a href="/" class="nav__link">
                    <i class='bx bx-log-out nav__icon' ></i>
                    <span class="nav__name">Log Out</span>
                </a>
            </nav>
        </div>
        <main className="body-pd">
        {children}
        </main>
        </React.Fragment>
    )
}

export default PageHeader