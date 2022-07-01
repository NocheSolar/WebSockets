const fs = require('fs');

class Contenedor {
    constructor(archivo) {
      this.archivo = "msgs.txt";
    }

    async save (message) {
        try{
            const savemsg = `FechaYHora: ${message.time}, UserName: ${message.username}, Mensaje: ${message.message}\n`;
            await fs.promises.appendFile(`./${this.archivo}.txt`, savemsg);
            console.log("Mensaje guardado correctamente")
        } catch(error) {
            console.log(`Ocurrio el siguiente error al guardar el mensaje: ${error}`)
        }
    }
    async getAll () {
        let allMsgs = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        console.log("Listado de mensajes: ", allMsgs);
        return allMsgs;
    }
    async deleteAll () {
        //para borrar simplemente reescribo el archivo y le cargo unas llaves para marcarlo como vacío
        await fs.promises.writeFile(`./${this.archivo}.txt`, '{}');
        return "Borrado con exito"
    }
};

module.exports = Contenedor;
