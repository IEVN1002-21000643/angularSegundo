import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Empleado{
  matricula:number,
  nombre:string,
  correo:string,
  edad:number,
  horas:number,
  horasPago:number,
  horasExtra:number,
  subtotal:number
}

@Component({
  selector: 'app-registro-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro-empleados.component.html',
  styleUrl: './registro-empleados.component.css'
})

export default class RegistroEmpleadosComponent implements OnInit{
  formGroup!:FormGroup

  empleado:Empleado={
    matricula:0,
    nombre:'',
    correo:'',
    edad:0,
    horas:0,
    horasPago:0,
    horasExtra:0,
    subtotal:0
  }
  
  empleadosI:any=[]
  total=0

  constructor (private fb:FormBuilder) {}

  ngOnInit(): void {
    this.formGroup= this.initForm();
  }
  initForm():FormGroup{
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      edad: [''],
      horas: ['']
    })
  }

  registrar():void{
    const {matricula, nombre, correo, edad, horas} = this.formGroup.value
    this.empleado.matricula = matricula
    this.empleado.nombre = nombre
    this.empleado.correo = correo
    this.empleado.edad = edad
    this.empleado.horas = horas

    let calculos= this.calculos(horas)

    this.empleado.horasPago = calculos[0]
    this.empleado.horasExtra = calculos[1]
    this.empleado.subtotal = calculos[2]

    let empleadosJSON = this.empleado


    //localStorage.setItem(matricula, empleadosJSON)
    let empleadosLS:any=JSON.parse(localStorage.getItem('empleados')!)
    if(localStorage.getItem('empleados')){
      empleadosLS.push(empleadosJSON)
      localStorage.setItem('empleados', JSON.stringify(empleadosLS))
    }else{
      empleadosLS=[empleadosJSON]
      localStorage.setItem('empleados', JSON.stringify(empleadosLS))
    }
  }
  modificar():void{
    const {matricula, nombre, correo, edad, horas} = this.formGroup.value
    this.empleado.matricula = matricula
    this.empleado.nombre = nombre
    this.empleado.correo = correo
    this.empleado.edad = edad
    this.empleado.horas = horas

    let calculos= this.calculos(horas)

    this.empleado.horasPago = calculos[0]
    this.empleado.horasExtra = calculos[1]
    this.empleado.subtotal = calculos[2]

    let empleadosJSON = this.empleado

    let todosEmpleados:any=JSON.parse(localStorage.getItem('empleados')!)
    for(let emp of todosEmpleados){
      if(empleadosJSON.matricula==emp.matricula){
        emp.nombre=empleadosJSON.nombre
        emp.correo=empleadosJSON.correo
        emp.edad=empleadosJSON.edad
        emp.horas=empleadosJSON.horas
        emp.horasPago=empleadosJSON.horas
        emp.horasExtra=empleadosJSON.horasExtra
        emp.subtotal=empleadosJSON.subtotal
      }
    }
    localStorage.setItem('empleados', JSON.stringify(todosEmpleados))
  }

  eliminar():void{
    const {matricula, nombre, correo, edad, horas} = this.formGroup.value
    let todosEmpleados:any=JSON.parse(localStorage.getItem('empleados')!)
    let nuevosEmpleados:any=[]
    for(let emp of todosEmpleados){
      if(matricula !== emp.matricula){
        nuevosEmpleados.push(emp)
      }
    }
    localStorage.setItem('empleados', JSON.stringify(nuevosEmpleados))
  }

  imprimir():void{
    this.empleadosI=JSON.parse(localStorage.getItem('empleados')!)
    for(let emp of this.empleadosI)
    {
      this.total+=emp.subtotal
    }
    
  }

  calculos(horas:number):[number, number, number]{
    let horasPago:number=0
    let horasExtras:number=0
    let subtotal:number=0
    if (horas<=40){
      horasPago=horas*70
    }else if (horas>40){
      horasExtras=((horas-40)*140)
      horasPago=40*70
    }
    subtotal=horasPago+horasExtras
    return [horasPago, horasExtras, subtotal]
  }
}
