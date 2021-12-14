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
            profilePic: 'f12b9003-c36b-4f42-9618-02f8ed20a0bb.png',
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
            profilePic: 'f12b9003-c36b-4f42-9618-02f8ed20a0bb.png',
            password: '1234',
        },
        {
            firstName: 'Matias',
            lastName: 'Garcia',
            email: 'mgarcia@hotmail.com',
            cuit: '20291540362',
            gender: 'M',
            dateOfBirth: new Date('1982/09/14'),
            phone: '2994111457',
            nationality: 'Argentino',
            studyLevel: 'Universitario completo',
            degree: 'Ingeniero Electrico',
            profilePic: 'd5979379-611e-4e22-8acc-c59cb30ad116.jpg',
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

    await prisma.checkcategory.createMany({
        data: [{
            categoryName : 'Control Vehicular',                
            },{
            categoryName : 'Básico Seguridad',                
            },{
            categoryName : 'Trabajo en Altura',                
            },
        ]
    })

    await prisma.checkitem.create({
        data: {
            item : 'Mata Fuego',
            description : 'Matafuego de 2kg',
            categories: {
                connectOrCreate : {
                    where : {
                        category_id: 1
                    },
                    create : {
                        categoryName : 'Control Vehicular'
                    }
                }
            }
        },
        include: {
            categories : true
        }
    })
    await prisma.checkitem.create({
        data: {
            item : 'Caja de Herramientas',
            description : 'Caja herramientas básica reglamentaria',
            categories: {
                connectOrCreate : {
                    where : {
                        category_id: 1
                    },
                    create : {
                        categoryName : 'Control Vehicular'
                    }
                }
            }
        },
        include: {
            categories : true
        }
    })
    await prisma.checkitem.create({
        data: {
            item : 'Baliza',
            description : 'Baliza refractante',
            categories: {
                connectOrCreate : {
                    where : {
                        category_id: 1
                    },
                    create : {
                        categoryName : 'Control Vehicular'
                    }
                }
            }
        },
        include: {
            categories : true
        }
    })

    await prisma.checkitem.create({
        data: {
            item : 'Escalera',
            description : 'Escalera reglamentaria',
            categories: {
                connectOrCreate : {
                    where : {
                        categoryName: 'Trabajo en Altura',
                    },
                    create : {
                        categoryName : 'Trabajo en Altura'
                    }
                }
            }
        },
        include: {
            categories : true
        }
    })
    await prisma.checkitem.create({
        data: {
            item : 'Arnes',
            description : 'Arnes de 4 anclajes',
            categories: {
                connectOrCreate : {
                    where : {
                        categoryName: 'Trabajo en Altura',
                    },
                    create : {
                        categoryName : 'Trabajo en Altura'
                    }
                }
            }
        },
        include: {
            categories : true
        }
    })
    await prisma.checkitem.create({
        data: {
            item : 'Botas Seguridad',
            description : 'Botas puntera acero norma iso 241',
            categories: {
                connectOrCreate : {
                    where : {
                        categoryName: 'Vestimenta',
                    },
                    create : {
                        categoryName : 'Vestimenta'
                    }
                }
            }
        },
        include: {
            categories : true
        }
    })
    await prisma.checkitem.create({
        data: {
            item : 'Guantes',
            description : 'Guantes norma iso 241',
            categories: {
                connectOrCreate : {
                    where : {
                        categoryName: 'Vestimenta',
                    },
                    create : {
                        categoryName : 'Vestimenta'
                    }
                }
            }
        },
        include: {
            categories : true
        }
    })
     await prisma.vehicle.create({
        include : {
            vehicleonvehiclerequirement : true,
        },
        data : {
            domain : 'AB105RD',
            brand : 'TOYOYA',
            model : 'HILUX',
            type : 'Rodados - Pick Up - Cargas Peligrosas',
            year : 2019,
            internNumber: 1,
            chasisNumber : 'ASA8D1A2',
            motorNumber : '2ASDA8S1',
            frontPicUrl : 'ed875566-d8fd-4963-a139-2bd62113c069.jpeg',
            leftSidePicUrl : 'url',
            rightSidePicUrl : 'url',
            backPicUrl : 'url',
            vehicleonvehiclerequirement : {
                create : {
                    vehiclerequirements : {
                        create : {
                            expirated_At : new Date('2022/05/01'),
                            requirementDescription : 'Seguro Flota',
                            requirementName : 'Seguro',
                            urlPdf : 'url.pdf',
                        },                        
                    },
                    current : true,
                },
            },
        },
    })

    await prisma.vehicleonvehiclerequirement.create({
        include : {
            vehiclerequirements : true
        },
        data : {
            vehicle : {
                connect : {
                    vehicle_id : 1,
                }
            },
            vehiclerequirements : {
                create : {
                        expirated_At : new Date('2020/01/01'),
                        requirementDescription : 'Verificación Técnica Obligatoria',
                        requirementName : 'VTO',
                        urlPdf : 'url.pdf',
                    },
                },
                current : false,
        }
    })
    await prisma.vehicleonvehiclerequirement.create({
        include : {
            vehiclerequirements : true
        },
        data : {
            vehicle : {
                connect : {
                    vehicle_id : 1,
                }
            },
            vehiclerequirements : {
                create : {
                        expirated_At : new Date('2022/01/01'),
                        requirementDescription : 'Chequeo mensual de cubiertas y auxilio',
                        requirementName : 'Gomería - Control Mensual',
                        urlPdf : 'url.pdf',
                    },
                },
                current : true,
        }
    })

    await prisma.vehicle.create({
        include : {
            vehicleonvehiclerequirement : true,
        },
        data : {
            domain : 'AC995HY',
            brand : 'TOYOTA',
            model : 'ETIOS',
            type : 'Rodados - Automóvil',
            year : 2014,
            internNumber: 3,
            chasisNumber : 'BOWPSALKA24P1KL',
            motorNumber : 'PPASDO10409A',
            frontPicUrl : 'd24feb33-be0a-41ac-aba0-5754987142cc.jpeg',
            leftSidePicUrl : 'url',
            rightSidePicUrl : 'url',
            backPicUrl : 'url',
            vehicleonvehiclerequirement : {
                create : {
                    vehiclerequirements : {
                        create : {
                            expirated_At : new Date('2021/12/17'),
                            requirementDescription : 'Seguro Flota',
                            requirementName : 'Seguro',
                            urlPdf : 'url.pdf',
                        },
                    },
                    current : true,
                },
            },
        },
    })
    await prisma.vehicle.create({
        include : {
            vehicleonvehiclerequirement : true,
        },
        data : {
            domain : 'NNO778',
            brand : 'FIAT',
            model : 'TORO',
            type : 'Rodados - Pick Up - Cargas Peligrosas',
            year : 2014,
            internNumber: 3,
            chasisNumber : 'SABASD78A2A2',
            motorNumber : 'AS85GF4A88GA',
            frontPicUrl : '670fafc2-89bf-4d94-bdce-b7772bdc531c.jpeg',
            leftSidePicUrl : 'url',
            rightSidePicUrl : 'url',
            backPicUrl : 'url',
            vehicleonvehiclerequirement : {
                create : {
                    vehiclerequirements : {
                        create : {
                            expirated_At : new Date('2021/12/25'),
                            requirementDescription : 'Seguro Flota',
                            requirementName : 'Seguro',
                            urlPdf : 'url.pdf',
                        },
                    },
                    current : true,
                },
            },
        },
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
        },
        {
            businessName : 'SV Vertical',
            contact : 'Julio Vera',
            phone : '2995130120',
            email : 'jl.vera@gmail.com'
        }
        ]
     })
     
     await prisma.location.createMany({
        data : [{
            locationName : 'Refinería YPF',
            coordinates : '-45.48 10.45',
            province : 'Neuquén',
            customer_id : 1, 
         },
         {
            locationName : 'Campo Medanito',
            coordinates : '-47.10 200.45',
            province : 'Neuquén',
            customer_id : 1,
         },{
            locationName : 'Ruta 22 Km 124',
            coordinates : '-15.10 245.45',
            province : 'Río Negro',
            customer_id : 2,
         },
         {
            locationName : 'Centro de Capacitacion Parque Industrial',
            coordinates : '-15.10 245.45',
            province : 'Neuquén',
            customer_id : 3,
         },
        ]
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
            job: 'Electricista',
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