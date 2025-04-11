class HeaderComponent extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback(){
        this.render()
    }
    render(){
        this.shadowRoot.innerHTML = `
        <style>
            #header {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-evenly;
                padding: 20px;
                padding-left: 150px;
                padding-right: 150px;
               position: sticky;
                background: linear-gradient(#111111, transparent)
                
                
                 
            }
            img {
                width: 335px;
            }
            #navbar{
                
                display: flex;
                
                align-items: center;
                justify-content: space-around;
                width: 810px;
                gap: 48px;
                
                  
            }

            links {
                display: flex;
                justify-content: space-evenly;
                gap: 40px;
                
            }
            p{
                font-size: 24px;
                color: white;
            }

            input {
                font-size: 24px;
                color: white;
                border: 2px solid #FF0808;
                border-radius: 40px;
                padding: 8px;
                background-color: transparent;
                
            }
            
            input::placeholder{
                font-size: 24px;
                
                color: #A4A4A4;
                padding: 8px;

            }

       
        </style>
        <header id="header">
            <logo id="logo">
                <img src="https://i.ibb.co/PG67j7TQ/logo-medium-white.png" alt="Aninet">
            </logo>
            <navbar id="navbar">
                <links>
                    <p id="home">Home</p>
                    <p id="watch">Watch</p>
                    <p id="category">Category</p>
                    <p id="profile">Profile</p>
                </links>
                <searchbar>
                <input type="text" id="searchbar" placeholder="Search in site               &#128269;">
                </searchbar>
            </navbar>
            
            
        </header>
            
        `
    }
}

export default HeaderComponent