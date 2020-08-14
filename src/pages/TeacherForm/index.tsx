import React, {useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textearea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../serveces/api';

function TeacherForm(){
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    
    const [scheduleItens, setScheduleItens] = useState([
        { week_day: 0, from: '',  to: '' },
    ]);

    function addNewSchudeleItem(){
        setScheduleItens([
            ...scheduleItens,
            { week_day: 0, from: '',  to: '' }
        ]);
    }


    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens
        }).then(() => {
            alert('Cadastro efetuado com sucesso!');
            history.push('/');
            
        }).catch(() => {
            alert('Erro no cadastro!');
        });
    }

    function setScheduleItensValue(position: number, field: string, value: string)
    {
        const updateSheduleValueItens = scheduleItens.map((scheduleItem, index) => {
            if(index === position)
            {
                return { ...scheduleItem, [field]: value};
            }

            return scheduleItem;
        });

        setScheduleItens(updateSheduleValueItens);
    }

    return (
        <div id="page-teacher-form" className="container">
           <PageHeader 
            title="Que incrivel que você quer dar aulas." 
            description="O primerio passo  é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>

                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar} onChange={(e) => {
                                setAvatar(e.target.value)
                            }}  />
                        <Input 
                            name="whatsapp" 
                            label="Watsapp"
                            value={whatsapp} 
                            onChange={(e) => {
                                setWhatsapp(e.target.value)
                            }}  />

                        <Textearea 
                            name="bio" 
                            label="Biografia"
                            value={bio} onChange={(e) => {
                                setBio(e.target.value)
                            }}  />
                    </fieldset>


                    <fieldset>
                        <legend>Sobre Aula</legend>

                        <Select 
                            name="subject" 
                            label="Matéria"
                            options={[
                                {value: 'Artes', label: 'Artes'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Ciências', label: 'Ciências'},
                                {value: 'Educação Física', label: 'Educação Física'},
                                {value: 'Geografia', label: 'Geografia'},
                                {value: 'Matemática', label: 'Matemática'},
                                {value: 'Português', label: 'Português'},
                                {value: 'Química', label: 'Química'},

                            ]}
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value)
                            }}
                            />
                        <Input 
                            name="cost" 
                            value={cost}
                            label="Custo sua hora por aula"
                            onChange={(e) => {
                                setCost(e.target.value)
                            }} />
                    </fieldset>

                    <fieldset>
                            <legend>
                                Horários disponivel
                                <button type="button" onClick={addNewSchudeleItem}>
                                    + Novo horário
                                </button>
                            </legend>
                            

                            {scheduleItens.map((scheduleItem, index) => {
                                return (
                                    <div key={scheduleItem.week_day} className="schedule-item">
                                        <Select 
                                            name="week_day" 
                                            label="Dia da semana"
                                            value={scheduleItem.week_day}
                                            onChange={e => setScheduleItensValue(index, 'week_day', e.target.value)}
                                            options={[
                                                {value: '0', label: 'Domingo'},
                                                {value: '1', label: 'segunda-feira'},
                                                {value: '2', label: 'terça-feira'},
                                                {value: '3', label: 'quarta-feira'},
                                                {value: '4', label: 'quinta-feira'},
                                                {value: '5', label: 'sexta-feira'},
                                                {value: '6', label: 'sábado'},

                                            ]}
                                            />  

                                        <Input 
                                            name="from" 
                                            label="Das" 
                                            value={scheduleItem.from}
                                            type="time" 
                                            onChange={e => setScheduleItensValue(index, 'from', e.target.value)}
                                        />
                                        <Input 
                                            name="to" 
                                            label="Até" 
                                            type="time" 
                                            value={scheduleItem.to}
                                            onChange={e => setScheduleItensValue(index, 'to', e.target.value)}
                                        />
                                    </div>
                                )
                            })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Prencha todos os dados
                        </p>

                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
       </div>
    )

}

export default TeacherForm;