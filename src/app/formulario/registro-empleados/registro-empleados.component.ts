import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Empleado{
  matricula:number,
  nombre:string,
  correo:string,
  edad:number,
  horas:number
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
    horas:0
  }
  ad:string=''
  empleadosI:any=[]
  modificando=0
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
  //poner datos en un formulario
  modifyForm(emp:any):FormGroup{
    return this.fb.group({
      matricula: [emp.matricula],
      nombre: [emp.nombre],
      correo: [emp.correo],
      edad: [emp.edad],
      horas: [emp.horas]
    })
  }

  registrar():void{
    let exist=0
    const {matricula, nombre, correo, edad, horas} = this.formGroup.value
    this.empleado.matricula = matricula
    this.empleado.nombre = nombre
    this.empleado.correo = correo
    this.empleado.edad = edad
    this.empleado.horas = horas

    let empleadosJSON = this.empleado

    let empleadosLS:any=JSON.parse(localStorage.getItem('empleados')!)
    
    //Verifica si existe ya un registro con esa matricula
    for(let emp of empleadosLS){
      if(matricula == emp.matricula){
        exist=1
      }
    }
    //si no existe lo crea
    if(exist==0){
      //Si empleadosLS ya tiene registros añade el nuevo item
      if(localStorage.getItem('empleados')){
        empleadosLS.push(empleadosJSON)
        localStorage.setItem('empleados', JSON.stringify(empleadosLS))
      }
      //Si empleadosLS encontro [] lo llena y crea el item
      else
      {
        empleadosLS=[empleadosJSON]
        localStorage.setItem('empleados', JSON.stringify(empleadosLS))
      }
      this.ad=''
    }else{
      this.ad=`El empleado con la matricula "${matricula}" ya existe`
    }
    //Reinicia valores
    this.formGroup= this.initForm();
    this.empleadosI=[]
    this.total=0
  }
  
  modificar():void{
    let exist=0
    let encontrado=0
    const {matricula, nombre, correo, edad, horas} = this.formGroup.value
    this.empleado.matricula = matricula
    this.empleado.nombre = nombre
    this.empleado.correo = correo
    this.empleado.edad = edad
    this.empleado.horas = horas

    let empleadosJSON = this.empleado
    let empleadoModificado = []
    //Verifica si existe ya un registro con esa matricula
    let todosEmpleados:any=JSON.parse(localStorage.getItem('empleados')!)
    for(let emp of todosEmpleados){
      if(matricula == emp.matricula){
        encontrado=1
        exist=0
        empleadoModificado=emp
      }else if (matricula != emp.matricula && encontrado==0){
        exist=1
      }
    }
    
    if(this.modificando == 0){
      this.formGroup=this.modifyForm(empleadoModificado)
      this.modificando=1
      if(exist==1){
        this.modificando=0
        this.ad=`El empleado con la matricula "${matricula}" no existe`
        this.formGroup= this.initForm();
        this.empleadosI=[]
        this.total=0
      }else{
        this.ad=''
      }
    }else{
      this.modificando=0
      for(let emp of todosEmpleados){
        if(empleadosJSON.matricula==emp.matricula){
          emp.nombre=empleadosJSON.nombre
          emp.correo=empleadosJSON.correo
          emp.edad=empleadosJSON.edad
          emp.horas=empleadosJSON.horas
        }
      }
      localStorage.setItem('empleados', JSON.stringify(todosEmpleados))
      this.formGroup= this.initForm();
      this.empleadosI=[]
      this.total=0
      this.ad=''
    }
  }

  eliminar():void{
    let exist=0
    const {matricula} = this.formGroup.value
    let todosEmpleados:any=JSON.parse(localStorage.getItem('empleados')!)
    let nuevosEmpleados:any=[]
    for(let emp of todosEmpleados){
      if(matricula !== emp.matricula){
        exist=0
        nuevosEmpleados.push(emp)
      }else if(matricula == emp.matricula){
        exist=1
      }
    }
    if(exist==1){
      localStorage.setItem('empleados', JSON.stringify(nuevosEmpleados))
      this.ad=''
    }else{
      this.ad=`El empleado con la matricula "${matricula}" no existe`
    }
    this.formGroup=this.initForm();
    this.empleadosI=[]
    this.total=0
  }

  imprimir():void{
    this.total=0
    this.ad=''
    this.empleadosI=JSON.parse(localStorage.getItem('empleados')!)
    for(let emp of this.empleadosI)
      {
        let horasPago:number=0
        let horasExtras:number=0
        if (emp.horas<=40){
          horasPago=emp.horas*70
        }else if (emp.horas>40){
          horasExtras=((emp.horas-40)*140)
          horasPago=40*70
        }
        emp.horasPago=horasPago
        emp.horasExtra=horasExtras
        emp.subtotal=(horasPago+horasExtras)
        this.total+=horasPago+horasExtras
      }
  }

}
