const screenSeq = require('../models-sequelize/screen-seq');
const { Op } = require("sequelize");

class ScreenModel
{
 
    constructor(screen_id, screen_description, aplication_id, active, user_id_created, user_id_updated) 
    {
        this.screen_id = screen_id;
        this.screen_description = screen_description;
        this.aplication_id = aplication_id;
        this.active = active;
        this.user_id_created = user_id_created;
        this.user_id_updated = user_id_updated;
    }


    isValid() {

        if(!this.aplication_id || this.aplication_id === 0) {
            return {ok: false, message: "Ingrese la aplicación"};
        }
        if(!this.screen_description || !this.screen_description === "") {
            return {ok: false, message: "No se ha ingresado la descripción de la pantalla."};
        }

        return {ok: true, message: "OK"};
    }

    isValidUpdate() {
        if(!this.screen_id || this.screen_id ===0 ) {
            return {ok: false, message: "No se ha especificado la pantalla ID."};
        }

        if(!this.user_id_updated || this.user_id_updated === 0) {
            return {ok: false, message: "No se ha especificado el usuario que modifica"};
        }

        return this.isValid();
    }

    async ExistNameScreen(isUpdated) {
        try {
            let screen;

            if(!isUpdated) {
                screen = await screenSeq.findOne({
                    where: {
                        screen_description: this.screen_description
                    },
                    attributes:['screen_id']
                });
            } else if(isUpdated) {
                screen = await screenSeq.findOne({
                    where: {
                        aplication_description: this.aplication_description,
                        aplication_id: {[Op.ne]: this.aplication_id}
                    },
                    attributes: ['screen_id']
                });
            }

            return screen;
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

            const existScreen = await this.ExistNameScreen(false);
            if(existScreen) {
                throw new Error("Ya existe una pantalla con ese nombre");
            }

            const createScreen = await screenSeq.create({
                screen_description: this.screen_description,
                aplication_id: this.aplication_id,
                active: this.active,
                creation_date: new Date(),
                user_created: this.user_id_created
            })

            return createScreen;
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

            const existScreen = await this.ExistNameAplication(true);
            if(existScreen) {
                throw new Error("Ya existe una aplicación con ese nombre");
            }

            const updateScreen = await screenSeq.update({
                screen_description: this.screen_description,
                aplication_id: this.aplication_id,
                active: this.active,
                user_updated: this.user_id_updated,
                updated_date: new Date()
            },{
                where: {
                    screen_id: this.screen_id
                }
            })

            return updateScreen;
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async Delete() {
        try {
            if(!this.screen_id || this.screen_id === 0) {
                throw new Error("Especifique la pantalla a eliminar");
            }

            await screenSeq.destroy({
                where: {
                    screen_id: this.screen_id
                }
            });

            return true;
        } catch(error) {
            throw new Error(error.message);
        }
    }
    static GetScreens() {
        return screenSeq.findAll({
            attributes: ['screen_id', 'screen_description', 'active', 'creation_date']
        ,order: [
            ['screen_description']
        ]});
    }

    static GetScreenResume() {
        return screenSeq.findAll({
            where: {
                active: true
            }
            ,attributes: ['screen_id', 'screen_description']
        ,order: [
            ['screen_description']
        ]});
    }

    static GetScreenById(id) {
        return screenSeq.findOne({
            where: {
                screen_id: id
            }
            ,attributes: ['screen_id', 'screen_description', 'active']
        });
    }
}

module.exports = ScreenModel;
