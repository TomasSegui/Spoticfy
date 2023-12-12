const Connection = require("../db");

const getAlbumes = (_, res) => {

    Connection.query("SELECT * FROM albumes " , (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        return res.status(200).json(resultado);
    });

    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
};

const getAlbum = (req, res) => {

    const id = req.params.id; 
    Connection.query("SELECT * FROM albumes WHERE id=?" , [id] , (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        if(!resultado){
            return res.status(404).json({mensaje : "no existe ese album"});
        }
        return res.status(200).json(resultado);
    });

    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */
};

const createAlbum = (req, res) => {

    const nuevoAlbum = req.body;
    Connection.query("SELECT * FROM artistas WHERE id = ?" , [nuevoAlbum.artista] , (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        if(!resultado){
            return res.status(404).json({mensaje : "no existe ese artista"});
        }
        Connection.query("INSERT INTO albumes (id, nombre , artista) VALUES (id , ? , ?)" , [nuevoAlbum.nombre , nuevoAlbum.artista] , (error, resulutado) => {

            if (error){
                return res.status(500).json({ mensaje : "error"});
            }
            return res.status(201).json({mensaje : "album creado"});
        });
    });

    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const updateAlbum = (req, res) => {

    const id = req.params.id;
    const nuevoNombre = req.body;

    Connection.query("UPDATE albumes SET nombre = ? WHERE id = ?" , [nuevoNombre.nombre, id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        return res.status(200).json({ mensaje: "album actualizado" });

    });

    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const deleteAlbum = (req, res) => {

    const id = req.params.id;
    Connection.query("DELETE FROM albumes WHERE id = ?" , [id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        return res.status(200).json({ mensaje: "album eliminado" });

    });


    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const getCancionesByAlbum = (req, res) => {

    const id = req.params.id;
    Connection.query("SELECT * FROM canciones WHERE album = ?" , [id], (error, resultado) => {

        if (error) {
            return res.status(500).json({ mensaje: "error" });
        }
        if (!resultado) {
            return res.status(404).json({ mensaje: "No hay ninguna cancion de ese album" });
        }
        return res.status(200).json(resultado);

    });

    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

module.exports = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};
