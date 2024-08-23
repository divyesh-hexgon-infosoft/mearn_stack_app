// const bcrypt = require('bcryptjs');

exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    // const values = Object.values(object);
    const columnKeys = keys.filter(key => object[key] != null && object[key] != undefined && object[key] != '');
    const values = columnKeys.map(key => object[key]);

    const columnSet = columnKeys.map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    };
};

exports.multipleColumnSetUpdate = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    // const values = Object.values(object);
    const columnKeys = keys.filter(key => object[key] != null && object[key] != undefined && object[key] != 'null');
    const values = columnKeys.map(key => object[key]);

    const columnSet = columnKeys.map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    };

};

exports.multipleColumnSetCreateQuery = (object)=>{

    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    // const values = Object.values(object);
    const columnKeys = keys.filter(key => object[key] !== null && object[key] !== undefined);
    const values = columnKeys.map(key => object[key]);

    const columnSet = columnKeys.map(key => `${key}`).join(', ');
    const questionmarkSet = columnKeys.map(key => `?`).join(',');

    return {
        columnSet,
        questionmarkSet,
        values
    };

}

exports.parseTime = (time) => {
    let times = time.split(":");
    let hours = times[0];
    if (hours.length === 1) hours = `0${hours}`; // pad leading 0
    return `${hours}:${times[1]}:${times[2]}`;
};

exports.multipleFilterSet = (object) => {
    console.log("this is multipale filter set : ",object);
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);

    const filteredKeys = keys.filter(key => object[key] !== null && object[key] !== undefined && object[key] !== '' && object[key] !=='all');
    const filteredValues = filteredKeys.map(key => object[key]);

    const filterSet = filteredKeys.map(key => `${key} = ?`).join(' AND ');

    return {
        filterSet,
        filterValues: filteredValues
    };
};

exports.multipleFilterSetUpdate = (object) => {
    console.log("this is multipale filter set : ",object);

    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);

    const filteredKeys = keys.filter(key => object[key] !== null && object[key] !== undefined && object[key] !=='all');
    const filteredValues = filteredKeys.map(key => object[key]);

    const filterSet = filteredKeys.map(key => `${key} = ?`).join(' AND ');

    return {
        filterSet,
        filterValues: filteredValues
    };

};

exports.multipleFilterSetJoiQuery = (object,table_name) => {

    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);

    const filteredKeys = keys.filter(key => object[key] !== null && object[key] !== undefined && object[key] !== '');
    const filteredValues = filteredKeys.map(key => object[key]);

    const filterSet = filteredKeys.map(key => `${table_name}.${key} = ?`).join(' AND ');

    return {
        filterSet,
        filterValues: filteredValues
    };
};

exports.pagination = (object)=>{
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }
    let paginationString;
    if(object.per_page){
        paginationString = ` limit ${object.per_page}`;
    }
    if(object.page_no > 1){
        let page_no = (object.page_no-1) * (object.per_page || 0);

        paginationString += ` offset ${page_no}`;
    }

    return paginationString;

}

exports.orderBy = (sortedBy)=>{
    const orderkeyObject = {
        price:'price',
        date:'start_date',
    }

    const keys = Object.keys(orderkeyObject);

    const orderarray = sortedBy.split('_');

    let string = ' order by id desc';
    if(keys.includes(orderarray[1])){
        string = ` order by ${orderkeyObject[orderarray[1]]} ${orderarray[0]}`;
    }

    return string;

}

exports.structureResponse = (body, success, message) => {

    return {
        headers: {success, message},
        body: body
    };

};

// exports.hashPassword = async (body) => {

//     if (body.password) {
//         body.password = await bcrypt.hash(body.password, 8);
//     }

// };

exports.yearRegex = new RegExp(/^(19[5-9]\d|20[0-4]\d|2050)$/);

exports.OTPRegex = new RegExp(/^[0-9]{4}$/);

exports.seatRegex = new RegExp(/^[A-Z]{1,2}-[0-9]{1,}$/);

exports.timeRegex = new RegExp(/^([01][0-9]|2[0-3]):[0-5][0-9]$/); 

exports.datetimeRegex = new RegExp(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/);
