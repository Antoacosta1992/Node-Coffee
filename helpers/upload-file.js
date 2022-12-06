const path =  require ('path');
const { v4: uuidv4 } = require ('uuid');

const uploadFile = (files, validatedExtensions = ["png", "jpg", "jpeg", "gif"], folder = "") => {
	return new Promise((resolve, reject) => {
		//Del argumento files desestructuramos el archivo
		const { file } = files;
		//Separamos las palabras del nombre del archivo que contengan un . y guardamos todo en un array
		const cutName = archivo.name.split(".");
		//Obtenemos el ultimo item del array que siempre es la extension del archivo
		const extension = cutName[cutName.length - 1];

		//Validar que la extension del archivo esté dentro de las permitidas, si no esta permitida tira error
		if (!validatedExtensions.includes(extension)) {
			return reject(`The extension ${extension} is not allowed, the allowed extensions are ${validatedExtensions}`);
		}

		//Generamos un nombre random para el archivo y lo concatenamos con la extension
		const nombreTemp = uuidv4() + "." + extension;
		//Esto es para quie funcione el dirname, siempre va de la mano con el import del path y del fileURLToPath
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		//Generamos el path en donde vamos a guardar el archivo y le pasamos el nombre generado arriba
		const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

		//Movemos el archivo al path generado arriba
		file.mv(uploadPath, (err) => {
			if (err) {
				console.log(err)
				return reject(err);
			}

			resolve(nameTemp);
		});
	});
}

module.exports = {
	uploadFile
}