"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";


export default function Home() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    const [modelList, setModelList] = useState([])
    const { register, handleSubmit, reset } = useForm()
    const [editMode, setEditMode] = useState(false)

    const columns = [
        {
            field: "Action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <button
                            onClick={() => startEditMode(params.row)}
                            className="ml-1 hover:bg-red-200  py-1 px-2 "
                        >
                            ✎
                        </button>
                        <button
                            onClick={() => deleteModel(params.row)}
                            className="ml-3 hover:bg-red-200 py-1 px-2 "
                        >
                            🗑️
                        </button>
                    </div>
                )
            }
        },
        { field: "name", headerName: "Model Name", width: 300 },
    ]

    async function fetchModel() {
        const modelData = await fetch(`${API_BASE}/model`)
        const models = await modelData.json()

        const formattedModels = models.map((model) => ({
            ...model,
            id: model._id,
        }));
        setModelList(formattedModels);
    }


    useEffect(() => {
        fetchModel();
    }, []);


    const handleSubmitForm = (data) => {
        if (editMode) {
            fetch(`${API_BASE}/model`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(() => {
                stopEditMode();
                fetchModel()
            });
            return
        }
        // create new customer
        fetch(`${API_BASE}/model`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => fetchModel());
    };

    async function deleteModel(model) {
        if (!confirm([`Deleting ${model.name}`])) return;

        const id = model._id;
        await fetch(`${API_BASE}/model/${id}`, { method: "DELETE" });
        fetchModel();
    }

    function startEditMode(model) {
        reset(model)
        setEditMode(true)
    }
    function stopEditMode() {
        reset({
            name: '',
        });
        setEditMode(false);
    }

    return (
        <div>
            <Navbar />
            <main className=" bg-gray-200 min-h-screen pt-20">
                <form onSubmit={handleSubmit(handleSubmitForm)} className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="grid grid-cols-2 gap-4 w-fit m-4 border border-gray-800 p-2">
                        <div>Model Name:</div>
                        <div>
                            <input
                                name="name"
                                type="text"
                                {...register("name", { required: true })}
                                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>

                        <div className="col-span-2 text-right">
                            {editMode ?
                                <>
                                    <input
                                        type="submit"
                                        className="italic bg-green-500 hover:bg-grenn-800 text-white font-bold py-2 px-4 rounded-full"
                                        value="Update" />
                                    {' '}
                                    <button
                                        onClick={() => stopEditMode()}
                                        className="italic bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
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
                        <h2 className="text-xl font-semibold mb-4">Model List</h2>
                        <DataGrid
                            rows={modelList}
                            columns={columns}
                            pageSize={5}
                            className="text-gray-700"
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}