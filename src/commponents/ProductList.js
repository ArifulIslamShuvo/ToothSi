import React, { useEffect, useState } from 'react';
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import './ProductList.css';
import { BeakerIcon } from '@heroicons/react/24/solid'
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [quantity, setQuantity] = useState(0);
    console.log(quantity);

     
    const handleCard = ()=> {

    }

    // console.log(products);

    const getProducts = async () => {
        try {
            const results = await axios.get("products.json");
            setProducts(results.data);
            setFilterProducts(results.data);
        } catch (error) {
            console.log(error);
        }
    };
    // table colum
    const columns = [
        {
            name: <h1 className="table-header">Img</h1>,
            selector: (row) => <img src={row.img} className="w-12 h-16 py-2" alt='' />,
        },
        {
            name: <h1 className="table-header">Name</h1>,
            selector: (row) => row.name,
        },
        {
            name: <h1 className="table-header">Description</h1>,
            selector: (row) => row.description,
        },
        {
            name: <h1 className="table-header">Color</h1>,
            selector: (row) => row.color,
        },
        {
            name: <h1 className="table-header">Price</h1>,
            selector: (row) => row.price,
        },
        
        {
            name: <h1 className="table-header">Buy</h1>,
            cell: (row) => (
                <div className='flex justify-start gap-5'>
                    <input className='text-black p-1 w-16' type='number'
                                onChange={(e) => setQuantity(e.target.value)}></input>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </div>
            ),
        },
    ];
    // table design 
    createTheme(
        "solarized",
        {
            text: {
                primary: "#66E4ED",
                secondary: "#2aa198",
            },
            background: {
                default: "#002b36",
            },
            context: {
                background: "#cb4b16",
                text: "#FFFFFF",
            },
            divider: {
                default: "#073642",
            },
            action: {
                button: "rgba(0,0,0,.54)",
                hover: "rgba(0,0,0,.08)",
                disabled: "rgba(0,0,0,.12)",
            },
        },
        "dark"
    );
    //   function call
    useEffect(() => {
        getProducts();
    }, []);
    // product filter 
    useEffect(() => {
        const result = products.filter((d) => {
            return (
                d.name.toLowerCase().match(search.toLowerCase()) ||
                d.img.toLowerCase().match(search.toLowerCase()) ||
                d.description.toLowerCase().match(search.toLowerCase()) ||
                d.color.toLowerCase().match(search.toLowerCase()) ||
                d.price.toLowerCase().match(search.toLowerCase())||
                d.size.toLowerCase().match(search.toLowerCase())
            );
        });
        // console.log(result);
        setFilterProducts(result);
    }, [search, products]);
    return (
        <div>
            <DataTable
                columns={columns}
                data={filterProducts}
                pagination
                theme="solarized"
                title={<h1 className="text-2xl text-blue-600">Products collection</h1>}
                fixedHeader
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <div className='flex items-center gap-96'>
                        <div className='flex item-center gap-10'>
                            <div>
                                <select className="select select-info w-full max-w-xs">
                                    <option disabled selected>Hodi</option>
                                    {
                                        products.map(p =><option>{p.name}</option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <select className="select select-info w-full max-w-xs">
                                    <option disabled selected>Size</option>
                                    {
                                        products.map(p =><option>{p.size}</option>)
                                    }
                                    
                                    
                                </select>
                            </div>
                            <div className='pt-3 text-white flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>

                                <h1 className=''>Reset</h1>
                            </div>
                        </div>
                        <div className=''>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input input-bordered input-teal-500 bg-slate-200 text-black max-w-xs"
                                placeholder="Search to filter"
                            />
                            <button onClick={()=>handleCard()} className='btn btn-primary m-2'>Add to card</button>
                        </div>
                    </div>

                }
                subHeaderAlign="center"
            />
        </div>
    );
};

export default ProductList;