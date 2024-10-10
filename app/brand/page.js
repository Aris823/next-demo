"use client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";

export default function Home() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    const [brandList, setBrandList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const modelsRef = useRef([]);

    const columns = [
        {
            field: "Action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div>
                        <button
                            onClick={() => startEditMode(params.row)}
                            className="ml-5 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded-md"
                        >
                            ✎
                        </button>
                        <button
                            onClick={() => deleteBrand(params.row)}
                            className="ml-5 hover:bg-red-800 hover:text-white text-black font-bold py-1 px-3 rounded-md"
                        >
                            🗑️
                        </button>
                    </div>
                );
            }
        },
        { field: "modelName", headerName: "Model", width: 300 },
        { field: "name", headerName: "Brand", width: 300 },
        { field: "color", headerName: "Color", width: 300 },
        { field: "amount", headerName: "Total Amount", width: 300 }
    ];


    async function fetchModel() {
        try {
            const response = await fetch(`${API_BASE}/model`);
            if (!response.ok) {
                throw new Error('Failed to fetch models');
            }
            const models = await response.json();
            setModelList(models); 
            modelsRef.current = models; 
            return models;
        } catch (error) {
            console.error('Error fetching models:', error);
            modelsRef.current = [];
            return [];
        }
    }

    
    async function fetchBrand(models) {
        try {
            const response = await fetch(`${API_BASE}/brand`);
            if (!response.ok) {
                throw new Error('Failed to fetch brands');
            }
            const brands = await response.json();

            const formattedBrands = brands.map((brand) => {
                const model = models.find((model) => model._id === brand.model);
                return {
                    ...brand,
                    id: brand._id,
                    modelName: model ? model.name : 'Unknown Model'
                };
            });
            setBrandList(formattedBrands);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const models = await fetchModel();
            await fetchBrand(models);
        };
        fetchData();
    }, []);

    // Delete Brand
    async function deleteBrand(brand) {
        try {
            if (!confirm(`Deleting ${brand.name}`)) return;

            const id = brand._id;
            const response = await fetch(`${API_BASE}/brand/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error('Failed to delete brand');
            }
            // After successful deletion, fetch brands with the latest models
            await fetchBrand(modelsRef.current);
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    }


    const handleBrandFormSubmit = async (data) => {
        try {
            const method = editMode ? "PUT" : "POST";
            const response = await fetch(`${API_BASE}/brand`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`Failed to ${editMode ? 'update' : 'create'} brand`);
            }
            if (editMode) {
                stopEditMode();
            }
            await fetchBrand(modelsRef.current);
        } catch (error) {
            console.error('Error submitting brand form:', error);
        }
    };

    function startEditMode(brand) {
        reset(brand);
        setEditMode(true);
    }

    function stopEditMode() {
        reset({
            name: '',
            color: '',
            amount: ''
        });
        setEditMode(false);
    }

    return (
        <div>
            <Navbar />
            <main className="p-8 bg-gray-100 min-h-screen pt-20">
                <form onSubmit={handleSubmit(handleBrandFormSubmit)} className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="grid grid-cols-2 gap-4 w-fit m-4 border border-gray-800 p-2">
                        <div>Car Model:</div>
                        <div>
                            <select
                                name="model"
                                {...register("model", { required: true })}
                                className="border border-black w-full"
                            >
                                {modelList.map((c) => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>Brand name:</div>
                        <div>
                            <input
                                name="name"
                                type="text"
                                {...register("name", { required: true })}
                                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>

                        <div>Color:</div>
                        <div>
                            <input
                                name="color"
                                type="text"
                                {...register("color", { required: true })}
                                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>

                        <div>Total amount:</div>
                        <div>
                            <input
                                name="amount"
                                type="number"
                                {...register("amount", { required: true })}
                                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>

                        <div className="col-span-2 text-right">
                            {editMode ?
                                <>
                                    <input
                                        type="submit"
                                        className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                        value="Update" />
                                    {' '}
                                    <button
                                        type="button"
                                        onClick={() => stopEditMode()}
                                        className="italic bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                                    >Cancel</button>
                                </>
                                :
                                <input
                                    type="submit"
                                    value="Add"
                                    className="w-20 italic bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                                />
                            }
                        </div>

                    </div>
                </form>

                <div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Brand List</h2>
                        <DataGrid
                            rows={brandList}
                            columns={columns}
                            pageSize={5}
                            className="text-gray-700"
                        />
                    </div>
                </div>

            </main>
        </div>
    );
}
