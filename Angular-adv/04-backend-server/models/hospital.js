const {Schema, model} = require('mongoose');

let HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {collection: 'hospitales'});

// Debido a que el id en la respuesta sale como _id, se procede a quitar ese guion bajo para
// traerlo como 'id'
HospitalSchema.method('toJSON', function (){
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model( 'Hospital', HospitalSchema );
