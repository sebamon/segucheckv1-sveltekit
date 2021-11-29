// import  { PrismaClient } from "@prisma/client";
// import { links } from 
import pkg from '@prisma/client';
import { now } from 'moment';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
// async function main() {
async function main(){
    
    await prisma.roles.createMany({
        data:[{
            rolDescription : 'Gestor Documental'
        },{
            rolDescription : 'Tecnico Seguridad'
        },
        {
            rolDescription : 'Operador'
        }]
    })

    await prisma.users.createMany({
        data:[{
            firstName: 'Esteban',
            lastName: 'Kito',
            email: 'ekito@gmail.com',
            cuit: '20297154702',
            gender: 'M',
            dateOfBirth: new Date('1982/11/07'),
            phone: '2995103456',
            nationality: 'Argentino',
            studyLevel: 'Post universitario incompleto',
            degree: 'Tecnico Universitario en Desarrollo web',
            profilePic: 'url:not found',
            password: '1234',
        },
        {
            firstName: 'Juan Armando',
            lastName: 'Asado',
            email: 'jasado@hotmail.com',
            cuit: '20284569872',
            gender: 'M',
            dateOfBirth: new Date('1980/01/12'),
            phone: '2996478214',
            nationality: 'Argentino',
            studyLevel: 'Universitario completo',
            degree: 'Contador Publico',
            profilePic: 'url not:found',
            password: '1234',
        },
        {
            firstName: 'Joaquin',
            lastName: 'Pino',
            email: 'jpino@hotmail.com',
            cuit: '20245676122',
            gender: 'M',
            dateOfBirth: new Date('1970/06/12'),
            phone: '299614848',
            nationality: 'Argentino',
            studyLevel: 'Universitario completo',
            degree: 'Ingeniero Electrico',
            profilePic: 'url not:found',
            password: '1234',
        },
    ]})

    await prisma.usersonroles.createMany({
        data : [{
                user_id: 1,
                rol_id: 1,
                assignedBy: '1',
            },{
                user_id: 2,
                rol_id: 3,
                assignedBy: '1',
            },
            {
                user_id : 1,
                rol_id : 2,
                assignedBy : '1'
            }
        ]
    })
        
    await prisma.riskanalysis.create({
        data : {
            riskName : 'Analisis Basico' ,
            riskUrl :   'http://dive.com/analisis-basico',
            description : 'Un Basico analisis de riesgo'
        }
    })

    
    await prisma.checkitem.createMany({
        data: [{
            item : 'Mata Fuego',
            description : 'Matafuego de 2kg',
        },{
            item : 'Casco',
            description : 'Casco Reglamentario para trabajo en altura',
        }]
    })

    await prisma.checkitemgroup.createMany({
        data : [{
            groupName : 'Basico Vehiculo',
            checkItem_id : 1
        },{
            groupName : 'Basico Altura',
            checkItem_id : 2
        }
    ]
    })

     await prisma.vehicle.createMany({
         data:[{
            domain : 'AB105RD',
            brand : 'TOYOYA',
            model : 'HILUX',
            type : 'Rodados - Pick Up - Cargas Peligrosas',
            year : 2019,
            internNumber: 1,
            chasisNumber : 'ASA8D1A2',
            motorNumber : '2ASDA8S1',
            frontPicUrl : 'url',
            leftSidePicUrl : 'url',
            rightSidePicUrl : 'url',
            backPicUrl : 'url',
         },
         {
            domain : 'AC457DA',
            brand : 'TOYOTA',
            model : 'ETIOS',
            type : 'Rodados - Automóvil',
            year : 2020,
            internNumber: 2,
            chasisNumber : 'ASASA132',
            motorNumber : 'NB8AS5D28QD5',
            frontPicUrl : 'url',
            leftSidePicUrl : 'url',
            rightSidePicUrl : 'url',
            backPicUrl : 'url',
         }
        ]
     })

      await prisma.operator.createMany({
         data:[{
             user_id : 1,

         },{
            user_id: 2,
        },]

     })

     await prisma.customer.createMany({
         data: [{
            businessName : 'YPF',
            contact : 'Juan Carlos',
            phone : '11548789152',
            email : 'juanca@ypf.com'
         },{
            businessName : 'Axion',
            contact : 'Estaban Kito',
            phone : '29947421418',
            email : 'estankito@axion.com'
        }
        ]
     })
     
     await prisma.location.createMany({
        data : [{
            locationName : 'Refinería YPF',
            coordenites : '-45.48 10.45',
            province : 'Neuquén',
            customer_id : 1, 
         },
         {
            locationName : 'Campo Medanito',
            coordenites : '-47.10 200.45',
            province : 'Neuquén',
            customer_id : 1,
         },{
            locationName : 'Allen City',
            coordenites : '-15.10 245.45',
            province : 'Río Negro',
            customer_id : 2,
         }]
     })
     
     await prisma.userworkinfo.createMany({
         data: [{
             operator_id : 1,
             dischargeDate : new Date('2021-01-01'),
             employementRel : 'Monotributista',
             hiringMode: 'Por Obra',
             unionAgreement : 'AATVVAC',
             job: 'Trabajo en Altura - Tecnico Vertical'
         },{
            operator_id : 2,
            dischargeDate : new Date('2020-06-09'),
            employementRel : 'Relación de dependencia',
            hiringMode: 'A tiempo completo',
            unionAgreement : 'UoCRA',
            job: 'Torrista',
         }]
     })

     await prisma.useraddress.createMany({
         data : [{
            operator_id : 1,
            countryOfOrigin : 'Argentina',
            stateOfOrigin : 'Neuquén',
            cityOfOrigin : 'Neuquén',
            zipCodeOfOrigin : '8300',
            addressOfOrigin : 'San Martin 158',
            phoneOfOrigin : '2994782185',
            countryOfResidence : 'Argentina',
            stateOfResidence : 'Neuquén',
            cityOfResidence : 'Neuquén',
            zipCodeOfResidence : '8300',
            addressOfResidence : 'Juan Rosas 13',
            phoneOfResidence : '4422021',
         },
         {
            operator_id : 2,
            countryOfOrigin : 'Argentina',
            stateOfOrigin : 'Córdoba',
            cityOfOrigin : 'La Falda',
            zipCodeOfOrigin : '8457',
            addressOfOrigin : 'Sarmiento 13',
            phoneOfOrigin : '261123124',
            countryOfResidence : 'Argentina',
            stateOfResidence : 'Neuquén',
            cityOfResidence : 'Neuquén',
            zipCodeOfResidence : '8300',
            addressOfResidence : 'Juan B. Justo 10 D1',
            phoneOfResidence : '299484218',
         },
        ]
     })
    
     await prisma.userhealthinfo.createMany({
         data : [{
            operator_id : 1,
            bloodType : 'A' ,
            rh : true,
            allergies : 'Avejas',
         },{
            operator_id : 2,
            bloodType : 'O',
            rh : false,
            allergies : 'Polvo',
         }]
     })
    }
    
main()
      .catch((e) => {
        console.error(e)
        process.exit(1)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })