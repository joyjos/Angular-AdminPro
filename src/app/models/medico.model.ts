import { Hospital } from './hospital.model';

interface MedicoUser{
    _id:string,
    nombre:string,
    img:string
}

export class Medico {

    constructor(
        public nombre:string,
        public _id?:any,
        public img?:any,
        public usuario?:MedicoUser,
        public hospital?:Hospital
    ){}
}
