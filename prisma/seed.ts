// import  { PrismaClient } from "@prisma/client";
// import { links } from 
import pkg from '@prisma/client';
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


    }
    
main()
      .catch((e) => {
        console.error(e)
        process.exit(1)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })