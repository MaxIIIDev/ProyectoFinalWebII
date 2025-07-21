import PDFDocument from "pdfkit"
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors"
import { Response } from "express"

export class PDFService{
    
    public static generarPDF(res:Response,nombreDelArchivo:string, callback: (document: PDFKit.PDFDocument ) =>  void ){
        try {
            res.setHeader("Content-Type", "application/pdf")
            res.setHeader("Content-Disposition", `inline; filename="${nombreDelArchivo}.pdf"`)
            const document = new PDFDocument({
                size: "A4",
                margin: 50,
                })

            document.pipe(res)
            callback(document)

            document.end()
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPDF", "PDFService", "11", error as string)
            return [error as string, undefined]
        }

    }

    
}
