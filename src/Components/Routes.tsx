import React from 'react'
import { Route } from "@tanstack/react-location";

// Authmiddleware && AdminMiddlewre
import AuthMiddleware from "./AuthMiddleware"; 
import AdminMiddleware from "./AdminMiddleware";

import Login from "../Pages/Login/Login";
import Free from "../Pages/Free/Free";
import Admin from '../Pages/Admin/Admin'
import UploadModels from "../Pages/UploadModels/UploadModels";
import SelectModel from "../Pages/SelectModel/SelectModel";
import Contactus from '@app/Pages/Contact/Contactus';
import Cart from '../Pages/AddToCart/AddToCart'

const localeValue: any = localStorage.getItem('language')

const routes: Route[] = [
    {
        path: '/free',
        children: [
            {
                path: '/',
                element: (
                    <AuthMiddleware withLayout>
                        <Free />
                    </AuthMiddleware>
                )
            },
            {
                path: ':modelGuid',
                element: (
                    <AuthMiddleware withLayout>
                        <SelectModel localeValue={localeValue}/>
                    </AuthMiddleware>
                )
                },
        ]
    },
    {
        path: '/login',
        element: (
            <AuthMiddleware>
                <Login />
            </AuthMiddleware>
        )
    },
    {
        path: '/cart',
        element: (
            <AuthMiddleware>
                <Cart />
            </AuthMiddleware>
        )
    },
    {
        path: '/upload-image',
        children: [
           {
                path: '/',
                element: (
                   <AuthMiddleware withLayout={true}>
                     <UploadModels />
                   </AuthMiddleware>
                )
           },
           {
            path: ':modelGuid',
            element: (
                <AuthMiddleware>
                    <UploadModels />
                </AuthMiddleware>
            )
            },
       
        ],
    },
    {
        path: '/admin-control',
        element: (
            <AdminMiddleware withLayout>
                <Admin />
            </AdminMiddleware>
        )
    },
    {
        path: '/contactus',
        element: (
            <AdminMiddleware withLayout>
                <Contactus />
            </AdminMiddleware>
        )
    }
]

export default routes