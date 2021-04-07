const appModel = require('../models-sequelize/aplication-seq');
const { Op } = require("sequelize");

class Aplication {

    constructor(aplication_id, aplication_description, active, user_id_created, user_id_updated) 
    {
        this.aplication_id = aplication_id;
        this.aplication_description = aplication_description;
        this.active = active;
        this.user_id_created = user_id_created;
        this.user_id_updated = user_id_updated;
    }

    isValid() {
        if(!this.aplication_description || !this.aplication_description === "") {
            return {ok: false, message: "No se ha ingresado la descripción de la aplicación."};
        }

        return {ok: true, message: "OK"};
    }

    isValidUpdate() {
        if(!this.aplication_id || this.aplication_id ===0 ) {
            return {ok: false, message: "No se ha especificado la aplication ID."};
        }

        if(!this.user_id_updated || this.user_id_updated === 0) {
            return {ok: false, message: "No se ha especificado el usuario que modifica"};
        }

        return this.isValid();
    }

    async ExistNameAplication(isUpdated) {
        try {
            let app;

            if(!isUpdated) {
                app = await appModel.findOne({
                    where: {
                        aplication_description: this.aplication_description
                    },
                    attributes:['aplication_id']
                });
            } else if(isUpdated) {
                app = await appModel.findOne({
                    where: {
                        aplication_description: this.aplication_description,
                        aplication_id: {[Op.ne]: this.aplication_id}
                    },
                    attributes: ['aplication_id']
                });
            }

            return app;
        }
        catch(error) {
            throw new Error(error);
        }
    }

    async Create() {
        try {

            const valid = this.isValid();
            if(!valid.ok) {
                throw new Error(valid.message);
            }

            const existAplication = await this.ExistNameAplication(false);
            if(existAplication) {
                throw new Error("Ya existe una aplicación con ese nombre");
            }

            const createApp = await appModel.create({
                aplication_description: this.aplication_description,
                active: this.active,
                creation_date: new Date(),
                user_created: this.user_id_created
            })

            return createApp;
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async Update() {
        try {
            const valid = this.isValidUpdate();
            if(!valid.ok) {
                throw new Error(valid.message);
            }

            const existApp = await this.ExistNameAplication(true);
            if(existApp) {
                throw new Error("Ya existe una aplicación con ese nombre");
            }

            const updateApp = await appModel.update({
                aplication_description: this.aplication_description,
                active: this.active,
                user_updated: this.user_id_updated,
                updated_date: new Date()
            },{
                where: {
                    aplication_id: this.aplication_id
                }
            })

            return updateApp;
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async Delete() {
        try {
            if(!this.aplication_id || this.aplication_id === 0) {
                throw new Error("Especifique la aplicación a eliminar");
            }

            await appModel.destroy({
                where: {
                    aplication_id: this.aplication_id
                }
            });

            return true;
        } catch(error) {
            throw new Error(error.message);
        }
    }
    static GetAplications() {
        return appModel.findAll({
            attributes: ['aplication_id', 'aplication_description', 'active', 'creation_date']
        ,order: [
            ['aplication_description']
        ]});
    }

    static GetAplicationsResume() {
        return appModel.findAll({
            where: {
                active: true
            }
            ,attributes: ['aplication_id', 'aplication_description']
        ,order: [
            ['aplication_description']
        ]});
    }

    static GetAplicationById(id) {
        return appModel.findOne({
            where: {
                aplication_id: id
            }
            ,attributes: ['aplication_id', 'aplication_description', 'active']
        });
    }
}

module.exports = Aplication;