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
            cuit: '202971547',
            gender: 'M',
            dateOfBirth: new Date('1982/11/07'),
            phone: '2995103456',
            nationality: 'Argentino',
            studyLevel: 'Secundario',
            degree: 'NS',
            profilePic: 'url:not found',
            password: '1234',
        },
        {
            firstName: 'Juan Armando',
            lastName: 'Asado',
            email: 'jasado@hotmail.com',
            cuit: '202845698712',
            gender: 'M',
            dateOfBirth: new Date('1980/01/12'),
            phone: '2996478214',
            nationality: 'Argentino',
            studyLevel: 'Universitario',
            degree: 'Nose que es',
            profilePic: 'url not:found',
            password: '1234',
        },]

    })

     await prisma.vehicle.createMany({
         data:[{
            domain : 'AB 105 RD',
            brand : 'TOYOYA',
            model : 'HILUX',
            type : 'Rodados - Pick Up - Cargas Peligrosas',
            year : 2019,
            chasisNumber : 'ASA8D1A2',
            motorNumber : '2ASDA8S1',
            frontPicUrl : 'url',
            leftSidePicUrl : 'url',
            rightSidePicUrl : 'url',
            backPicUrl : 'url',
         },
         {
            domain : 'AC 457 DA',
            brand : 'TOYOYA',
            model : 'ETIOS',
            type : 'Rodados - Automóvil',
            year : 2020,
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