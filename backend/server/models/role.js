const roleModel = require("../models-sequelize/role-seq");
const { Op } = require("sequelize");

class Role {
    constructor(role_id, role_description,user_id_created, user_id_updated) {
        this.role_id = role_id;
        this.role_description = role_description;
        this.user_id_created = user_id_created;
        this.user_id_updated = user_id_updated;
    }

    isValid() {
        if(!this.role_description || !this.role_description === "") {
            return {ok: false, message: "No se ha ingresado la descripción del rol."};
        }

        return {ok: true, message: "OK"};
    }

    isValidUpdate() {
        if(!this.role_id || this.role_id ===0 ) {
            return {ok: false, message: "No se ha especificado el rol ID."};
        }

        if(!this.user_id_updated || this.user_id_updated === 0) {
            return {ok: false, message: "No se ha especificado el usuario que modifica"};
        }

        return this.isValid();
    }

    async ExistNameRole(isUpdated) {
        try {
            let role;

            if(!isUpdated) {
                role = await roleModel.findOne({
                    where: {
                        role_description: this.role_description
                    },
                    attributes:['role_id']
                });
            } else if(isUpdated) {
                role = await roleModel.findOne({
                    where: {
                        role_description: this.role_description,
                        role_id: {[Op.ne]: this.role_id}
                    },
                    attributes: ['role_id']
                });
            }            

            return role;
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

            const existRole = await this.ExistNameRole(false);
            if(existRole) {
                throw new Error("Ya existe un rol con ese nombre");
            }

            const createRol = await roleModel.create({
                role_description: this.role_description,
                active: true,
                creation_date: new Date(),
                user_created: this.user_id_created
            });

            return createRol;
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

            const existRole = await this.ExistNameRole(true);
            if(existRole) {
                throw new Error("Ya existe un rol con ese nombre");
            }

            const updateRol = await roleModel.update({
                role_description: this.role_description,
                user_updated: this.user_id_updated,
                updated_date: new Date()
            },{
                where: {
                    role_id: this.role_id
                }
            })

            return updateRol;
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async Delete() {
        try {
            if(!this.role_id || this.role_id === 0) {
                throw new Error("Especifique el rol a eliminar");
            }

            await roleModel.destroy({
                where: {
                    role_id: this.role_id
                }
            });

            return true;
        } catch(error) {
            throw new Error(error.message);
        }
    }

    static GetRolesResume() {
        return roleModel.findAll({
            where: {
                active: true
            },
            attributes: ['role_id','role_description']
        })
    }

    static GetRoles() {
        return roleModel.findAll({
            where: {
                active: true
            },
            attributes: ['role_id','role_description','active', 'creation_date']
        ,order: [
            ['role_description']
        ]});
    }

    static GetRolById(role_id) {
        return roleModel.findOne({
            where: {
                role_id: role_id
            },
            attributes: ['role_id','role_description','active']
        });
    }

}

module.exports = Role;