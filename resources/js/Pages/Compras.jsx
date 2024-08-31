import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react';

export default function Compras({ auth }) {

    const [data, setData] = useState([]); 

    const fetchData = () => {
        axios.get('/shopping')
        .then(response => {
            setData(response.data); 
        }).catch(error => {
        });
    };

    useEffect(() => {
        fetchData();
    }, []); 

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
                    Artículos Comprados
                </h2>
            }
        >
            <div className="col-end-12 d-flex justify-content-center">
                <div className="container mt-4 col-9">
                    <ol className="list-group list-group-numbered">
                        {data.map(item => (
                            <li className="list-group-item d-flex justify-content-between align-items-start" key={item.id}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{item.prenda}</div>
                                    Talla: {item.Talla}
                                    Color: {item.Color}
                                    Tela: {item.Tela}
                                    </div>
                                <span className="badge bg-primary rounded-pill"> {item.Precio}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
