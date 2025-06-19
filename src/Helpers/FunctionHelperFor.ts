export class FunctionHelperFor{

    static validateEmail(email:string): [string?, boolean?]{

        try {
            const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!gmailPattern.test(email)) {
                return ["El correo debe ser una cuenta de Gmail.", false];
            }
            return [ undefined, true]
        } catch (error) {
            return[ error, false]
        }

    }

}