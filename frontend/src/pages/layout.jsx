import PageNavBar from '../components/PageNavBar';
import PageFooter from '../components/PageFooter';


function Layout({ children }) {
    return (
        <body>
            <header>
                <PageNavBar />
            </header>

            <main>
                {children}
            </main>

            <footer>
                <PageFooter />
            </footer>
            
        </body>
    );
}

export default Layout;