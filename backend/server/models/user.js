const usuarioModel = require('../models/usuarioSeq');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');

class User {

    constructor(user_id, user_name, role_id, password, passwordConfirm, active, user_id_created, user_id_updated) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.role_id = role_id;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.active = active;
        this.user_id_created = user_id_created;
        this.user_id_updated = user_id_updated;        
    }

    isValid(validatedPassword) {
        
        if(!this.user_name || this.user_name==="") {
            return {ok: false, message: "Ingrese el nombre del usuario"};
        }

        if(!this.role_id || this.role_id === 0) {
            return {ok: false, message: "Ingrese el rol del usuario"};
        }

        if((!this.password || this.password === "") && validatedPassword === true) {
            return {ok: false, message: "Ingrese la contraseña"};
        }

        const validPass = this.isValidPassword();
        if(!validPass.ok) {
            return {ok: false, message: validPass.message};
        }

        return {ok: true, message: "OK"};
    }

    isValidPassword() {
        console.log("Valid password",this.password);
        console.log("confirm password",this.passwordConfirm);

        if(this.password !== this.passwordConfirm) {
            return {ok: false, message: "Confirme bien la contraseña"}
        }

        return {ok: true, message: "OK"};
    }

    async ExistUser(update) {

        try {
            let user;

            if(update === false) {
                user = await usuarioModel.findOne({
                    where: {
                        user_name: this.user_name
                    },
                    attributes: ['user_id']
                });
            } else if(update === true) {
                user = await usuarioModel.findOne({
                    where: {
                        user_name: this.user_name,
                        user_id: {[Op.ne]: this.user_id}
                    },
                    attributes: ['user_id']
                });
            }

            return user;
        }
        catch(error) {
            throw new Error(error);
        }
    }

    async Create () {
        try {
                        
            const userValid = this.isValid(true);
            if(!userValid.ok) {
                throw new Error(userValid.message);
            }

            const existUser = await this.ExistUser(false);

            if(existUser)
            {
                throw new Error("Ya existe un usuario con ese nombre");
            }

            const createUser = await usuarioModel.create({
                user_name: this.user_name,
                active: this.active,
                password: bcrypt.hashSync(this.password, 10),
                role_id: this.role_id,
                creation_date: new Date(),
                user_created: this.user_id_created
            });

            return createUser;
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async Update() {
        try {

            const userValid = this.isValid(false);

            if(!userValid.ok) {
                throw new Error(userValid.message);
            }

            const existUser = await this.ExistUser(true);
            
            if(existUser) {
                throw new Error("Ya existe un usuario con ese nombre")
            }

            usuarioModel.update({
                user_name: this.user_name,
                active: this.active,
                role_id: this.role_id,
                user_updated: this.user_id_updated,
                updated_date: new Date()
            }, {
                where: {
                    user_id: this.user_id
                }
            });

        } catch(error) {
            throw new Error(error.message);
        }
    }

    async Delete() {
        try {
            if(!this.user_id || this.user_id === 0) {
                throw new Error("Especifique el usuario a eliminar");
            }

            await usuarioModel.destroy({
                where: {
                    user_id: this.user_id
                }
            });

            return "Usuario eliminado";
        } catch(error) {
            throw new Error(error.message);
        }
    }

    static GetUsers() {
       
        return usuarioModel.findAll({
            attributes: ['user_id', 'user_name','creation_date','active']
        , order: [
            ['user_name']
        ]});
    }

    static GetUserById(user_id) {
        return usuarioModel.findOne({
            where: {
                user_id: user_id
            },
            attributes: ['user_id','user_name', 'role_id','active']
        })
    }

}

module.exports = User;