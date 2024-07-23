// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { ClientProxyFactory, Transport } from "@nestjs/microservices";


// @Injectable()
// export class ClientProxy { 

//     constructor(private  configService: ConfigService) {}

//     getClientProxyUserService(): ClientProxy {
//         return ClientProxyFactory.create({
//             transport: Transport.RMQ,
//             options: {
//                 urls: [this.configService.get<string>('RABBIT_MQ_URI')],
//                 queue: this.configService.get<string>('RABBIT_MQ_USER_QUEUE')
//             }
//         })
//     }

// }