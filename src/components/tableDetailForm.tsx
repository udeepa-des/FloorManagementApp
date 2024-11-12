import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { RootState } from '../store/store';
import { updateTable, toggleTableActive } from '../store/floorManagementSlice';
import 'react-toastify/dist/ReactToastify.css';

const TableDetailsForm = () => {
    const dispatch = useDispatch();
    const { selectedTable } = useSelector((state: RootState) => state.floorManagement);

    if (!selectedTable) {
        return null;
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Table name is required'),
        minCovers: Yup.number().min(1, 'Minimum covers must be at least 1').required('Minimum covers is required'),
        maxCovers: Yup.number()
            .min(Yup.ref('minCovers'), 'Maximum covers must be greater than or equal to minimum covers')
            .required('Maximum covers is required'),
    });

    const handleSubmit = (values: any) => {
        dispatch(updateTable({ tableId: selectedTable.id, updates: values }));
    };

    const handleToggle = () => {
        dispatch(toggleTableActive(selectedTable.id));
    };

    return (
        <Formik
            initialValues={{
                name: selectedTable.name,
                minCovers: selectedTable.minCovers,
                maxCovers: selectedTable.maxCovers,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form className="space-y-4">
                    <h3 className="font-medium">Table Details</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600 block mb-1">Table Name</label>
                            <Field
                                type="text"
                                name="name"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                            />
                            {errors.name && touched.name ? (
                                <div className="text-red-500 text-sm">{errors.name}</div>
                            ) : null}
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-1">Min Covers</label>
                            <div className="flex items-center">
                                <button
                                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            updateTable({
                                                tableId: selectedTable.id,
                                                updates: { minCovers: Math.max(1, selectedTable.minCovers - 1) },
                                            })
                                        )
                                    }
                                >
                                    -
                                </button>
                                <Field
                                    type="number"
                                    name="minCovers"
                                    className="mx-4 w-full max-w-[4rem] px-3 py-2 border border-gray-200 rounded-lg"
                                />
                                <button
                                    className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600"
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            updateTable({
                                                tableId: selectedTable.id,
                                                updates: { minCovers: selectedTable.minCovers + 1 },
                                            })
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                            {errors.minCovers && touched.minCovers ? (
                                <div className="text-red-500 text-sm">{errors.minCovers}</div>
                            ) : null}
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-1">Max Covers</label>
                            <div className="flex items-center">
                                <button
                                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            updateTable({
                                                tableId: selectedTable.id,
                                                updates: { maxCovers: Math.max(1, selectedTable.maxCovers - 1) },
                                            })
                                        )
                                    }
                                >
                                    -
                                </button>
                                <Field
                                    type="number"
                                    name="maxCovers"
                                    className="mx-4 w-full max-w-[4rem] px-3 py-2 border border-gray-200 rounded-lg"
                                />
                                <button
                                    className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600"
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            updateTable({
                                                tableId: selectedTable.id,
                                                updates: { maxCovers: selectedTable.maxCovers + 1 },
                                            })
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                            {errors.maxCovers && touched.maxCovers ? (
                                <div className="text-red-500 text-sm">{errors.maxCovers}</div>
                            ) : null}
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-1">Online</label>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Active</span>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${selectedTable.active ? 'bg-red-500' : 'bg-gray-200'
                                        } cursor-pointer`}
                                    onClick={handleToggle}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handleToggle();
                                        }
                                    }}
                                >
                                    <div
                                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${selectedTable.active ? 'left-7' : 'left-1'
                                            }`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-6">
                        <label className="text-sm text-gray-600">Advanced Settings</label>
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-gray-600 ml-auto" />
                    </div>



                </Form>
            )}
        </Formik>
    );
};

export default TableDetailsForm;