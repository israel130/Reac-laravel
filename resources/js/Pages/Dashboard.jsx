import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2'

export default function Dashboard({ auth }) {

    const { prenda, Precio, Talla, Color, Tela } = usePage().props;
    const imageUrl = `/img/${prenda}.png`;

    const sale = () => {
        Swal.fire({
            title: `¿Estás seguro de comprar el artículo de ${prenda}?`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Comprar",
            denyButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: 'post',
                    url: '/make/purchase',
                    data: {
                        prenda:prenda, 
                        Precio:Precio, 
                        Talla:Talla,
                        Color:Color,
                        Tela:Tela,
                    }
                }).then(response => {
                    Swal.fire("Comprado!", "", "success");
                    setTimeout(() => {
                        window.location.href = "/Compras";
                    }, 1500);
                }).catch(error => {});
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">Articulo seleccionado para comprar</h2>}
        >
            <Head title="Comprar" />

            <div className="py-12 col-12">

                {prenda ? (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div className="text-center mb-4 text-2xl font-bold">Prenda seleccionada: {prenda}</div>
                                <div className="card" style={{ width: '30rem' }}>
                                    <img src={imageUrl} className="card-img-top  max-h-48" alt="..." />
                                    <div className="card-body text-center">
                                        <h5 className="card-title text-xl font-bold mb-2">{prenda}</h5>

                                        <div className='col-12 row d-flex justify-content-center'>
                                            <div className="mb-2 col-2">
                                                <h4 className="text-black">Precio:</h4>
                                                <span className="text-black font-bold">${Precio}</span>
                                            </div>
                                            <div className="mb-2 col-2">
                                                <h4 className="text-black">Talla:</h4>
                                                <span className="text-black font-bold">{Talla}</span>
                                            </div>
                                            <div className="mb-2 col-2">
                                                <h4 className="text-black">Color:</h4>
                                                <span className="text-black font-bold">{Color}</span>
                                            </div>
                                            <div className="mb-3 col-3">
                                                <h4 className="text-black">Tela:</h4>
                                                <span className="text-black font-bold">{Tela}</span>
                                            </div>
                                        </div>

                                        <button type="button" className="btn btn-outline-success"  onClick={sale}>Comprar</button>
                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="alert alert-info bg-red-500 col-6 text-center">
                            Ningún artículo seleccionado.
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}


