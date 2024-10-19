import { Routes } from "@angular/router";

export default[

    {
        path: 'ejemplo1',
        loadComponent: ()=>import('./ejemplo1/ejemplo1.component')
    },
    {
        path: 'zodiaco',
        loadComponent: ()=>import('./zodiaco/zodiaco.component')
    },
    {
        path: 'registroEmpleados',
        loadComponent: ()=>import('./registro-empleados/registro-empleados.component')
    }
] as Routes