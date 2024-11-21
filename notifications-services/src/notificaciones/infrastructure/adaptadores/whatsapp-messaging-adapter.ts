// import axios from "axios";
// import { IMessagingService } from "../../domain/services/IMessagingService";
// import config from "../../../config/config";

// export class WhatsAppMessagingAdapter implements IMessagingService {
//   async sendVerificationCode(
//     phoneNumber: string,
//     message: string
//   ): Promise<void> {
//     const url = "https://graph.facebook.com/v20.0/490293344159088/messages";
//     const data = {
//       messaging_product: "whatsapp",
//       to: phoneNumber,
//       type: "template",
//       template: {
//         name: "verify_token", // Nombre de tu plantilla personalizada verify_code_1
//         language: { code: "en_US" }, // Ajusta el idioma de la plantilla si es necesario
//         components: [
//           {
//             type: "body",
//             parameters: [
//               {
//                 type: "text",
//                 text: message.substring(0, 15),
//               },
//             ],
//           },
//         ],
//       },
//     };

//     try {
//       const response = await axios.post(url, data, {
//         headers: {
//           Authorization: `Bearer ${config.whatsApiToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("Mensaje enviado: ", response.data);
//     } catch (error: any) {
//       console.error(
//         "Error al enviar mensaje de WhatsApp: ",
//         error.response?.data || error.message
//       );
//       throw error;
//     }
//   }
// }
