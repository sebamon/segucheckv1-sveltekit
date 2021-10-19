import type { Prisma } from "@prisma/client";
import PrismaClientPkg from "@prisma/client";

const PrismaClient = PrismaClientPkg.PrismaClient;

const prisma = new PrismaClient();
// async function main() {
    const main = async () =>{
    
    const createUser = await prisma.users.createMany({
        data:[{
            firstName: 'Esteban',
            lastName: 'Kito',
            email: 'ekito@gmail.com',
            cuit: '202971547',
            gender: 'masculino',
            dateOfBirth: '01/07/1982',
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
            gender: 'Masculino',
            dateOfBirth: '29/01/1980',
            phone: '2996478214',
            nationality: 'Argentino',
            studyLevel: 'Universitario',
            degree: 'Nose que es',
            profilePic: 'url not:found',
            password: '1234',
        },]

    })

     const crearVehiculos = await prisma.vehicle.createMany({
         data:[{
            domain : 'AB 105 RD',
            brand : 'TOYOYA',
            model : 'HILUX',
            type : 'CAMIONETA',
            year : 2019,
            chasisNumber : 'AS421018A8D1A2',
            motorNumber : '2ASD748A12D59A8S1',
            frontPicUrl : 'url',
            leftSidePicUrl : 'url',
            rigthSidePicUrl : 'url',
            backPicUrl : 'url',
         },
         {
            domain : 'AC 457 DA',
            brand : 'TOYOYA',
            model : 'ETIOS',
            type : 'AUTOMOVIL',
            year : 2020,
            chasisNumber : 'ASASA13218D1A2',
            motorNumber : 'NB8AS5D28QD59A8S1',
            frontPicUrl : 'url',
            leftSidePicUrl : 'url',
            rigthSidePicUrl : 'url',
            backPicUrl : 'url',
         }

        ]
     })

     const createOperator = await prisma.operator.createMany({
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