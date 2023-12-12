const Connection = require("../db");

const getCanciones = (_, res) => {

    Connection.query("SELECT * FROM canciones ", (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        return res.status(200).json(resultado);
    });

    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */
};

const getCancion = (req, res) => {

    const id = req.params.id;
    Connection.query("SELECT * FROM canciones WHERE id=?", [id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        if (!resultado) {
            return res.status(404).json({ mensaje: "no existe esa cancion" });
        }
        return res.status(200).json(resultado);
    });

    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
};

const createCancion = (req, res) => {

    const nuevaCancion = req.body;
    Connection.query("SELECT * FROM albumes WHERE id = ?", [nuevaCancion.album], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        if (!resultado) {
            return res.status(404).json({ mensaje: "no existe ese album" });
        }
        Connection.query("INSERT INTO canciones (id, nombre , album , duracion) VALUES (id , ? , ? , ?)", [nuevaCancion.nombre, nuevaCancion.album, nuevaCancion.duracion], (error, resulutado) => {

            if (error) {
                return res.status(500).json({ mensaje: "error" });
            }
            return res.status(201).json({ mensaje: "cancion creada" });
        });
    });

    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
};

const updateCancion = (req, res) => {

    const id = req.params.id;
    const nuevoNombre = req.body;

    Connection.query("UPDATE canciones SET nombre = ? WHERE id = ?", [nuevoNombre.nombre, id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        return res.status(200).json({ mensaje: "cancion actualizada" });

    });

    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
};

const deleteCancion = (req, res) => {

    const id = req.params.id;
    Connection.query("DELETE FROM canciones WHERE id = ?", [id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        return res.status(200).json({ mensaje: "cancion eliminada" });

    });

    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const reproducirCancion = (req, res) => {

    const id = req.params.id;
    Connection.query("SELECT * FROM canciones WHERE id = ?", [id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        } if (!resultado) {
            return res.status(404).json({ mensaje: "no existe esa cancion" });
        }
        const cancion = resultado[0]; //con chat porque no sabia del error, selecciono solo el primer resultado porque puede ser un array. Auqnue se que no porque el id es unico.
        const reproducciones = cancion.reproducciones;
        const nuevasReproducciones = reproducciones + 1;
        Connection.query("UPDATE canciones SET reproducciones = ? WHERE id = ?", [nuevasReproducciones, id], (error, resultado) => {
            if (error) {
                return res.status(500).json({ mensaje: "error2" });
            }
            return res.status(200).json({ mensaje: "reproduccion actualizada" });
        });
    });

    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
};

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};
