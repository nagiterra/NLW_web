import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';

import './style.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../serveces/api';


function TeacherList(){
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        console.log(response.data);
        setTeachers(response.data);
        
    }
    return (
       <div id="page-teacher-list" className="container">
           <PageHeader title="Estes são os Proffys disponveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={ (e) => { setSubject(e.target.value) } }
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
                        />

                        <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={ (e) => { setWeekDay(e.target.value) } }
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
                        type="time" 
                        name="time" 
                        value={time}
                        onChange={ (e) => { setTime(e.target.value) } }
                        label="Hora" />


                    <button type="submit" >
                        Buscar
                    </button>

                </form>
            </PageHeader>

            <main>
                {teachers.map( (teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}  />;
                })}
                
            </main>
       </div>
    )

}

export default TeacherList;