import styles from './Home.module.css';

import savings from '../../img/savings.svg';
import LinkButton from '../layout/LinkButton';

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <span>Comece a gerenciar seus projetos agora mesmo!</span>
            <LinkButton to='/newproject' text='Criar novo projeto' />
            <img src={savings} alt="Costs" />
        </section>
    )
}

export default Home;