import { Link } from 'react-router-dom';

import Container from './Container';

import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png';

// Props podem ser usadas para autenticação de usuário
function Navbar() {
    return (
        <nav className={styles.navbar}>
        <Container>
            <img src={logo} alt="Costs" />
            <ul className={styles.list}>
                <li className={styles.item}><Link to="/">Home</Link></li>
                <li className={styles.item}><Link to="/projects">Meus Projetos</Link></li>
                <li className={styles.item}><Link to="/company">Empresa</Link></li>
                <li className={styles.item}><Link to="/contact">Contato</Link></li>
                {/* <li className={styles.item}><Link to="/newproject">Novo Projeto</Link></li> */}
            </ul>
        </Container>
      </nav>
    )
}

export default Navbar;