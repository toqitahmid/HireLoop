import AppNavbar from '../ui/Navbar';
import Footer from '../ui/Footer';

const HomeLayout = ({children}) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <AppNavbar></AppNavbar>
            <main className='flex-grow'>{children}</main>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;