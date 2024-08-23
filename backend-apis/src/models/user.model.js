const { DBService } = require('../db/db-service');
const {  multipleFilterSet, multipleFilterSetUpdate,multipleColumnSetUpdate } = require('../utils/common.utils');
const {tables} = require('../utils/tableNames.utils');

class UserModel {
    createUser =async (params)=>{
        console.log("create user model : ",params);
        const {name,email,image_name,username,mobile_no,password} = params;
        let sql = `insert into ${tables.Users} (full_name,email,username,mobile_no,image,password) values(?,?,?,?,?,?)`;
        await DBService.query(sql,[name,email,username,mobile_no,image_name,password]);
        return;
    }

    update = async (params, filters) => {

        console.log("update user model",params,filters);

        const { columnSet, values } = multipleColumnSetUpdate(params);
        const { filterSet, filterValues } = multipleFilterSetUpdate(filters);

        const sql = `UPDATE ${tables.Users} SET ${columnSet} WHERE ${filterSet}`;
        console.log("this is sql query for update user : ", sql, [...values, ...filterValues]);
        const result = await DBService.query(sql, [...values, ...filterValues]);
        // console.log("this is return result from updating user : ",result)
        return result ;

    }

    delete = async (params) => {

        const id = params.id;
        const sql = `DELETE FROM ${tables.Users}
        WHERE id = ?`;

        const result = await DBService.query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;

    }
    findAll = async (params = {}) => {

        console.log("find all user : ",params);
        let sql = `SELECT * FROM ${tables.Users}`;

        if (!Object.keys(params).length) {
            sql += ` order by id asc`
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        if(filterSet)
            sql += ` WHERE ${filterSet}`;

        sql += ` order by created_at desc`;

        // if(page_no){
        //     let offset = (page_no - 1 ) * perPage;
        //     sql += ` limit 15 offset ${offset}`;
        // }

        console.log("get all user query : ", sql , filterValues ) ; 

        return await DBService.query(sql, [...filterValues]);

    }

    findOne = async (params) => {

        console.log("find one user model : " , params);
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Users}
        WHERE ${filterSet}`;

        console.log("find one user query : " , sql,filterValues);
        const result = await DBService.query(sql, [...filterValues]);
        console.log("find one user result : ",result);

        // return back the first row (user);

        return result[0];

    }
}

module.exports = new UserModel;