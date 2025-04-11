class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    background-color: #111111;
                    color: white;
                    padding: 20px 0;
                    text-align: center;
                    font-family: 'Roboto', sans-serif;
                }
                
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }
                
                .footer-logo img {
                    width: 200px;
                }
                
                .footer-links {
                    display: flex;
                    gap: 20px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .footer-copyright {
                    color: #A4A4A4;
                    font-size: 0.9rem;
                    margin-top: 10px;
                }
            </style>
            
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="https://i.ibb.co/PG67j7TQ/logo-medium-white.png" alt="Aninet">
                </div>
                
                <div class="footer-links">
                    <span>About</span>
                    <span>•</span>
                    <span>Help</span>
                    <span>•</span>
                    <span>Terms</span>
                    <span>•</span>
                    <span>Privacy Policy</span>
                </div>
                
                <div class="footer-copyright">
                    © 2025 Ani-Net. All rights reserved. Contact: info@aninetsocialnetwork.com
                </div>
            </div>
        `;
    }
}

export default FooterComponent;