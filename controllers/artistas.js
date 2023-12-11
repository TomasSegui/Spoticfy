const Connection = require("../db");

const getArtistas = (_, res) => {

    Connection.query("SELECT * FROM artistas ", (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        return res.status(200).json(resultado);
    });

    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
};

const getArtista = (req, res) => {
    const id = req.params.id;
    Connection.query("SELECT * FROM artistas WHERE id = ?" , [id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        if (!resultado) {
            return res.status(404).json({ mensaje: "No existe ese artista" });
        }
        return res.status(200).json(resultado);

    });


    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
};

const createArtista = (req, res) => {

    const nuevoArtista = req.body;
    Connection.query("INSERT INTO artistas (id , nombre) VALUES (id , ?)" , [nuevoArtista.nombre], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        return res.status(201).json({ mensaje: "artista creado" });

    });

    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
};

const updateArtista = (req, res) => {

    const id = req.params.id;
    const nuevoNombre = req.body;

    Connection.query("UPDATE artistas SET nombre = ? WHERE id = ?" , [nuevoNombre.nombre, id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        return res.status(200).json({ mensaje: "artista actualizado" });

    });

    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
};

const deleteArtista = (req, res) => {

    const id = req.params.id;
    Connection.query("DELETE FROM artistas WHERE id = ?" , [id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        return res.status(200).json({ mensaje: "artista eliminado" });

    });

    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const getAlbumesByArtista = (req, res) => {

    const id = req.params.id;
    Connection.query("SELECT * FROM albumes WHERE artista = ?" , [id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        if (!resultado) {
            return res.status(404).json({ mensaje: "No hay ningun album de ese artista" });
        }
        return res.status(200).json(resultado);

    });

    // Completar con la consulta que devuelve las canciones de un artista 
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
};

const getCancionesByArtista = (req, res) => {

    const id = req.body;
    Connection.query("SELECT canciones.id AS idcancion, canciones.nombre, artistas.nombre AS nombreartista, albumes.nombre, canciones.duracion, canciones.reproducciones FROM((canciones INNER JOIN albumes ON canciones.album = albumes.id) INNER JOIN artistas ON artistas.id = albumes.artista) WHERE albumes.id = ?" , [id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        if (!resultado) {
            return res.status(404).json({ mensaje: "No hay ninguna cancion de ese artista" });
        }
        return res.status(200).json(resultado);

    });

    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

module.exports = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};
