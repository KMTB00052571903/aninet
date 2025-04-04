class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    background-color: #111111;
                    color: white;
                    padding: 40px 0;
                    margin-top: 50px;
                    font-family: 'Roboto', sans-serif;
                }

                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .footer-links {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin-bottom: 30px;
                }

                .footer-column {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    min-width: 150px;
                    margin-bottom: 20px;
                }

                .footer-column h3 {
                    color: #FF0808;
                    margin: 0 0 10px 0;
                    font-size: 1.2rem;
                }

                .footer-link {
                    color: #A4A4A4;
                    text-decoration: none;
                    font-size: 1rem;
                    transition: color 0.3s;
                }

                .footer-link:hover {
                    color: white;
                }

                .footer-bottom {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    border-top: 1px solid #333;
                    padding-top: 30px;
                }

                .footer-copyright {
                    color: #A4A4A4;
                    font-size: 0.9rem;
                }

                .footer-contact {
                    color: #A4A4A4;
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .footer-links {
                        flex-direction: column;
                        gap: 30px;
                    }
                }
            </style>

            <div class="footer-container">
                <div class="footer-links">
                    <div class="footer-column">
                        <h3>NAVIGATION</h3>
                        <a href="/index.html" class="footer-link">Home</a>
                        <a href="/watch.html" class="footer-link">Watch</a>
                        <a href="/profile.html" class="footer-link">Profile</a>
                    </div>

                    <div class="footer-column">
                        <h3>SUPPORT</h3>
                        <a href="/about.html" class="footer-link">About</a>
                        <a href="/help.html" class="footer-link">Help</a>
                        <a href="/terms.html" class="footer-link">Terms</a>
                    </div>

                    <div class="footer-column">
                        <h3>COMMUNITY</h3>
                        <a href="/communities.html" class="footer-link">Communities</a>
                        <a href="/privacy.html" class="footer-link">Privacy Policy</a>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-copyright">© 2025 Ani-Net. All rights reserved.</div>
                    <div class="footer-contact">Contact Us: info@aninetsocialnetwork.com</div>
                </div>
            </div>
        `;
    }
}

customElements.define('footer-component', FooterComponent);
export default FooterComponent;