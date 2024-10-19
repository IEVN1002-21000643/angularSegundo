import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Usuario{
  nombre:string
  edad:number
  zodiaco:string
  zodiacoUrl:string
}

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styleUrl: './zodiaco.component.css'
})

export default class ZodiacoComponent implements OnInit {
  formGroup!:FormGroup;

  persona:Usuario={
    nombre: '',
    edad: 0,
    zodiaco: '',
    zodiacoUrl: ''
  }

  Unombre=''
  Uedad=''
  Uzodiacal=''
  Uimagen=''

  zodiaco=[
    {nombre:'Mono', img:'https://www.clarin.com/img/westernastrology/mono.svg'},
    {nombre:'Gallo', img:'https://www.clarin.com/img/westernastrology/gallo.svg'},
    {nombre:'Perro', img:'https://www.clarin.com/img/westernastrology/perro.svg'},
    {nombre:'Cerdo', img:'https://www.confucioust.cl/web/wp-content/uploads/sites/3/2019/08/Ano-del-Cerdo.jpg'},
    {nombre:'Rata', img:'https://www.clarin.com/img/westernastrology/rata.svg'},
    {nombre:'Búfalo', img:'https://www.clarin.com/img/westernastrology/bufalo.svg'},
    {nombre:'Tigre', img:'https://www.clarin.com/img/westernastrology/tigre.svg'},
    {nombre:'Conejo', img:'https://www.clarin.com/img/westernastrology/conejo.svg'},
    {nombre:'Dragon', img:'https://www.clarin.com/img/westernastrology/dragon.svg'},
    {nombre:'Serpiente', img:'https://www.clarin.com/img/westernastrology/serpiente.svg'},
    {nombre:'Caballo', img:'https://www.clarin.com/img/westernastrology/caballo.svg'},
    {nombre:'Cabra', img:'https://www.clarin.com/img/westernastrology/cabra.svg'},
  ]

  constructor (private fb:FormBuilder) {}

  ngOnInit(): void {
    this.formGroup= this.initForm();
  }
  initForm():FormGroup{
    return this.fb.group({
      nombre: [''],
      aPaterno: [''],
      aMaterno: [''],
      dia: [''],
      mes: [''],
      anio: [''],
      sexo: [''],
    })
  }
  imprimir():void{
    const {nombre, aPaterno, aMaterno, dia, mes, anio, sexo} =this.formGroup.value
    this.persona.nombre=`${nombre} ${aPaterno} ${aMaterno}`
    const hoy=new Date()
    let edad=(hoy.getFullYear()-anio)
    if (hoy.getMonth()+1 < mes || hoy.getMonth()+1 == mes && hoy.getDate() < dia){
      edad--;
    }
    this.persona.edad = edad
    this.persona.zodiaco = this.zodiaco[anio%12].nombre
    this.persona.zodiacoUrl = this.zodiaco[anio%12].img

    this.Unombre=`Hola ${this.persona.nombre}`
    this.Uedad=`Tienes ${this.persona.edad} años`
    this.Uzodiacal=`Tu signo zodiacal es: ${this.persona.zodiaco}`
    this.Uimagen=this.persona.zodiacoUrl
  }
}
