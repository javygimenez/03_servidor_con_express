const fs = require("fs");

class Contenedor {
    constructor (fileName) {
        this.fileName = fileName;
        this.objects = [];
    }

    // Generar ID //
    async generateId() {
        try {
            this.objects = await this.getAll() || [];        
            const maxId = this.objects.length;
            this.objects.forEach(el => {
                el.id > maxId ? maxId = el.id : maxId
            })
            return maxId + 1;
        } catch (error) {
        console.log(error);
        }
    }

    // Guardar objetos //
    async save(obj) {
        try {
            const readFile = await this.getAll();            
            if (!readFile) {
                obj.id = await this.generateId();
                this.objects.push(obj);                
                await fs.promises.writeFile(this.fileName, JSON.stringify(this.objects, null, 2))                
                return obj.id;                
            }
            this.objects = readFile;
            obj.id = await this.generateId();
            this.objects.push(obj);            
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.objects, null, 2));            
            return obj.id;
        } catch (error) {
            console.log(error);
        }
    }

    // Devuelve el objeto con el ID indicado //
    async getById(id) {
        try {            
            const getById = await fs.promises.readFile(this.fileName, 'utf-8');
            this.objects = JSON.parse(getById);
            const obj = this.objects.find(el => el.id === Number(id));
            console.log(obj ? obj : null);
            return obj ? obj : null;
        } catch (err) {
            console.log(err);
        }
    }


    // Muestra el array de objetos en el archivo //
    async getAll() {
        try {
            const contenidoData = await fs.promises.readFile(this.fileName, 'utf-8');
            const data = JSON.parse(contenidoData);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }


    // Elimina el objeto con el ID indicado // 
    async deleteById(id) {
        try {            
            const deleteById = await fs.promises.readFile(this.fileName, 'utf-8');
            this.objects = JSON.parse(deleteById);
            this.objects = this.objects.filter(el => el.id != Number(id));            
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.objects, null, 2));
            console.log("El archivo se eliminó con éxito");
        } catch (err) {
            console.log(err);
        }
    }


    // Elimina todos los objetos guardados //
    async deleteAll() {
        try {            
            const deleteAll = await fs.promises.readFile(this.fileName, 'utf-8');
            this.objects = JSON.parse(deleteAll);
            this.objects = [];            
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.objects, null, 2));
            console.log("Los archivos se eliminaron con éxito");
        } catch (err) {
            console.log(err);
        }
    }
}


module.exports = Contenedor;