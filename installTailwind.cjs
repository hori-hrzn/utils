const { exec } = require('child_process');
const fs = require('fs');

// Ejecutar los comandos 'npm install' y 'npx tailwindcss init'
exec('npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(`Comandos ejecutados con éxito:\n ${stdout}`);

  // Leer el archivo tailwind.config.js
  fs.readFile('./tailwind.config.js', 'utf8', (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo tailwind.config.js: ${err.message}`);
      return;
    }

    // Modificar la línea de "content" en el archivo tailwind.config.js
    const nuevaConfiguracion = data.replace('content: []', `content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]`);

    // Escribir la nueva configuración en el archivo tailwind.config.js
    fs.writeFile('./tailwind.config.js', nuevaConfiguracion, (err) => {
      if (err) {
        console.error(`Error al escribir en el archivo tailwind.config.js: ${err.message}`);
        return;
      }
      console.log('Archivo tailwind.config.js modificado con éxito');
    });
  });

  // Añadir las directivas de Tailwind CSS al archivo ./src/index.css
  fs.appendFile('./src/index.css', '\n\n@tailwind base;\n@tailwind components;\n@tailwind utilities;', (err) => {
    if (err) {
      console.error(`Error al añadir las directivas de Tailwind CSS al archivo ./src/index.css: ${err.message}`);
      return;
    }
    console.log('Directivas de Tailwind CSS añadidas al archivo ./src/index.css con éxito');
  });
});
