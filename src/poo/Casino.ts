// import { GestionCasino } from "./interfaceGestionCasino.js";
import readlineSync from "readline-sync";
import pc from "picocolors";
import { Analogico } from "./Analogico";
import { Digital } from "./Digital";
import { Dado } from "./Dado";
import { Ruleta } from "./Ruleta";
import { GestionCasino } from "./interfaceGestionCasino";
import { Juego } from "./Juego";

export class Casino implements GestionCasino {
    private juegos: Juego[]; //LISTA DE JUEGOS
    private nombre: string; //NOMBRE DE CASINO

    constructor(nombre: string) {
        this.juegos = []; //INICIAR EN ARREGLO VACIO
        this.nombre = nombre;
    }

    // OBTENER EL NOMBRE DEL CASINO
    public getNombre(): string {
        return this.nombre;
    }

    // MODIFICAR EL NOMBRE DEL CASINO
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    // OBTENER LA LISTA DE LOS JUEGOS
    public getJuegos(): Juego[] | string {
        if (!this.verificarLongitudListaJuegos()) {
            return `No hay juegos en el casinno`;
        }
        return this.juegos;
    }

    // ACTUALIZAR O AÑADIR NUEVO JUEGO
    public setJuego(juego: Juego): void {
        this.juegos.push(juego);
    }

    // METODO QUE VERIFICA LA LONGITUD DE LA LISTA DE JUEGOS
    public verificarLongitudListaJuegos(): boolean {
        return this.juegos.length > 0;
    }

    // METODO QUE SE ENCARGA DE INSTANCIAR LOS JUEGOS SEGUN EL NOMBRE
    public instanciarJuegos(nombre: string): Juego | null {
        switch (nombre.toLowerCase()) {
            case "digital".toLowerCase(): {
                return new Digital(nombre, 20, 2000);
            }
            case "analogico".toLowerCase(): {
                return new Analogico(nombre, 20, 2000);
            }
            case "dados".toLowerCase(): {
                return new Dado(nombre, 20, 2000);
            }
            case "ruleta".toLowerCase(): {
                return new Ruleta(nombre, 20, 2000);
            }
            default: {
                return null
            }
        }
    }

    // METODO PARA BUSCAR JUEGO EN LA LISTA
    public agregarJuego(nombre: string):void {
            const nuevoJuego: Juego | null = this.instanciarJuegos(nombre);
            if (nuevoJuego) {
                this.setJuego(nuevoJuego);
                console.log(pc.green("Juego añadido con exito"));
                nuevoJuego.iniciarMenuDeOpciones();
            }
    }

    // FUNCION QUE VALIDA LAS ENTRADAS PARA EL JUEGO ELEGIDO
    public verificarEntradaJuego(entrada: number, cb: () => void) {
        switch (entrada) {
            case 1: {
                this.agregarJuego("digital");
                break;
            }
            case 2: {
                this.agregarJuego("analogico")
                break;
            }
            case 3: {
                this.agregarJuego("dados")
                break;
            }
            case 4: {
                this.agregarJuego("ruleta")
                break;
            }
            case 5: {
                this.iniciarPrograma();
                break;
            }
            case 6: {
                console.log(pc.bold("Saliste del casino, Gracias por su visita!"));
                return;
            }
            default: {
                console.log(pc.magenta(pc.bold("Error Intentelo nuevamente")));
                cb();
                break;
            }
        }
    }

    // MUESTRA OPCIONES DE JUEGO
    public elegirJuego() {
        let opcionMenu: number;
        setTimeout(() => {
            opcionMenu = readlineSync.questionInt(pc.white(pc.bold(`${pc.bgCyanBright("Elija una opcion:")}\n1- Digital.\n2- Analogico.\n3- Dados.\n4- Ruleta.\n5- Menu Principal \n6- Salir.\n`)));
            this.verificarEntradaJuego(opcionMenu, this.elegirJuego);
        }, 3000);
    }

    // FUNCION DE VALIDACION DEL MENU PRINCIPAL
    private verificarEntradaInicio(entrada: number, cb: () => void): void {
        switch (entrada) {
            // MENU OPCIONES
            case 1: {
                this.elegirJuego();
                break;
            }
            // SALIR
            case 2: {
                console.log(pc.bold("Salió del casino, Gracias por su visita!"));
                break;
            }
            // POR DEFECTO AUTOINVOCARSE PARA MEDIR DE VUELTA
            default: {
                console.log(pc.magenta(pc.bold("Error Intentelo nuevamente")));
                cb();
                break;
            }
        }
    }

    // INICIA EL PROGRAMA
    public iniciarPrograma(): void {
        let opcionMenu: number;
        setTimeout(() => {
            opcionMenu = readlineSync.questionInt(pc.yellow(pc.bold("1- Ver Juegos.\n2- Salir.\n")));
            this.verificarEntradaInicio(opcionMenu, this.iniciarPrograma);
        }, 3000);
    }
}