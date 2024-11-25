import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({dest: "./uploads", storage});

const routes = (app) => {
    // Habilita o parser JSON para lidar com requisições JSON
    app.use(express.json());
    app.use(cors(corsOptions));
    // Rota GET para obter todos os posts
    app.get("/posts", listarPosts);
    //Rota para criar um post
    app.post("/posts", postarNovoPost);
    //Rota para fazer o upload de um arquivo
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;