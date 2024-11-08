export class User {
    public idUsuario: number;
    public nombre: string;
    public apellido1: string;
    public apellido2: string;
    public fechaNacimiento: Date;
    public urlImagenPerfil: string;
    public telefono: string;
    public email: string;
    public contrasena: Buffer;
    public idDireccion: number;

    constructor(data: any) {
        this.idUsuario = data.idUsuario;
        this.nombre = data.nombre;
        this.apellido1 = data.apellido1;
        this.apellido2 = data.apellido2;
        this.fechaNacimiento = data.fechaNacimiento;
        this.urlImagenPerfil = data.urlImagenPerfil;
        this.telefono = data.telefono;
        this.email = data.email;
        this.contrasena = data.contrasena;
        this.idDireccion = data.idDireccion;
    }
}