import styles from './Container.module.css'

function Container(props) {
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {/* Conteúdo filho do componente Container aqui */}
            {props.children}
        </div>
    )
}

export default Container;