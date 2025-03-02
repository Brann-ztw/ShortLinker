# **ShortLinker** 🚀

¡Bienvenido a **ShortLinker**, el acortador de URLs más rápido y sencillo del universo! 🌌 Con **ShortLinker**, puedes convertir esas largas y tediosas URLs en enlaces cortos y fáciles de compartir. ¡Perfecto para tus tweets, mensajes y memes virales! 🐦💬

---

## **¿Qué es ShortLinker?** 🤔

**ShortLinker** es una aplicación web construida con **Node.js**, **Express** y **TypeScript** que te permite acortar URLs largas y guardarlas en un archivo JSON. Además, puedes redirigir a la URL original simplemente visitando el enlace acortado. ¡Es como magia, pero con código! ✨

---

## **Características principales** 🎯

- **Acortar URLs**: Convierte URLs largas en enlaces cortos y únicos.
- **Redirección automática**: Visita el enlace acortado y serás redirigido a la URL original.
- **Almacenamiento en JSON**: Guarda todas las URLs acortadas en un archivo JSON para su posterior uso.
- **Fácil de usar**: ¡Simplemente pega tu URL y obtén tu enlace corto en segundos!

---

## **Tecnologías utilizadas** 🛠️

- **Node.js**: El motor que impulsa nuestra aplicación.
- **Express**: Framework web rápido y minimalista para Node.js.
- **TypeScript**: Para un código más seguro y mantenible.
- **fs**: Módulo de Node.js para manejar archivos (en este caso, `urls.json`).

---

## **Instalación y uso** ⚙️

### **Requisitos previos**
- Node.js instalado (v16 o superior).
- npm o yarn (para gestionar dependencias).

### **Pasos para ejecutar el proyecto**

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Brann-ztw/ShortLinker.git
   cd shortlinker
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Compila el proyecto (TypeScript a JavaScript):
   ```bash
   npm run build
   ```

4. Inicia el servidor:
   ```bash
   npm start
   ```

5. ¡Listo! 🎉 El servidor estará corriendo en `http://localhost:3000`.

---

## **Cómo usar ShortLinker** 🖱️

### **Acortar una URL**
1. Haz una solicitud **POST** a `/shorten` con el cuerpo en formato JSON:
   ```json
   {
     "originalUrl": "https://www.ejemplo.com/una-url-muy-larga-y-complicada"
   }
   ```

2. Obtendrás una respuesta como esta:
   ```json
   {
     "shortUrl": "http://localhost:3000/abc123"
   }
   ```

### **Redirigir a la URL original**
1. Visita el enlace acortado en tu navegador:
   ```
   http://localhost:3000/abc123
   ```

2. ¡Serás redirigido automáticamente a la URL original! 🎯

---

## **Contribuir** 🤝

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar **ShortLinker**, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Añade nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## **Licencia** 📜

Este proyecto está bajo la licencia **MIT**. Para más detalles, consulta el archivo [LICENSE](LICENSE).

---

## **¿Preguntas o sugerencias?** 💬

¡No dudes en abrir un issue en el repositorio o contactarme directamente! Estoy aquí para ayudar. 😊

---

¡Gracias por usar **ShortLinker**! Espero que disfrutes acortando URLs tanto como yo disfruté creando esta herramienta. ¡Hasta la próxima! 🚀✨
