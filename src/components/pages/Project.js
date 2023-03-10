import { parse, v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../services/ServiceForm';
import Message from '../layout/Message';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    useEffect(() => {

        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
        .then((data) => {
            setProject(data);
        }).catch(err => console.error(err))
        }, 3000)

    }, [id])

    function editPost(project) {
        setMessage('');
        // Fazer budget validation
        if(project.budget < project.cost) {
            setMessage(`O orçamento não pode ser menor que o custo do projeto!`)
            setMessageType('error')
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        }).then(res => res.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            
            setMessage(`Projeto atualizado`)
            setMessageType('success')

        }).catch((err) => console.error(err))
    }
    
    function createService(project) {
        setMessage('');
        // last service
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setMessageType('error')
            project.services.pop()
            return false;
        }

        // add service cost to project total cost
        project.cost = newCost

        //update project with service
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((res) => res.json()).then((data) => {
            // to show the services
            console.log(data)
            }).catch(err => console.error(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return (<>
        {project.name ? (
           <div className={styles.project_details}>
                <Container customClass="column">
                    {message &&
                    <Message type={messageType} 
                    msg={message}/>} 
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button onClick={toggleProjectForm}
                        className={styles.btn}>
                            {!showProjectForm ? "Editar projeto" : "Fechar"}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p><span>Categoria:</span> {project.category.name}</p>
                                <p><span>Total de Orçamento:</span> R$ {project.budget}</p>
                                <p><span>Total Utilizado:</span> R$ {project.cost}</p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm 
                                handleSubmit={editPost}
                                btnText="Concluir edição"
                                projectData={project}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button onClick={toggleServiceForm}
                        className={styles.btn}>
                            {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm 
                                handleSubmit={createService}
                                btnText="+ Adicionar serviço"
                                projectData={project}/>
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        <p>Itens de Serviços</p>
                    </Container>
                </Container>
           </div>
        ) : (
            <Loading />
        )}
    </>)
}

export default Project;