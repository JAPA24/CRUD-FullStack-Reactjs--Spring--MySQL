package com.example.demoBD.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;






import com.example.demoBD.models.entity.Saludo;
import com.example.demoBD.models.services.ISaludoService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController

@RequestMapping("/api")
public class SaludoRestController {

    @Autowired
    private ISaludoService saludoService;

    @GetMapping("/saludos")
    public List<Saludo> index(){
        return saludoService.findAll();
    }

    @GetMapping("/saludos/{id}")
        public Saludo show(@PathVariable Long id){
            return saludoService.findById(id);
        }

    @PostMapping("/saludos")
    public Saludo create(@RequestBody Saludo saludo){

        return saludoService.save(saludo);
    }

    @PutMapping("/saludos/{id}")
    public Saludo update(@RequestBody Saludo saludo, @PathVariable Long id){
        Saludo saludoActual = saludoService.findById(id);

        saludoActual.setTexto(saludo.getTexto());
        saludoActual.setTipo(saludo.getTipo());


        return saludoService.save(saludoActual);
    }

    @DeleteMapping("/saludos/{id}")
    public void delete(@PathVariable Long id){
        saludoService.delete(id);
    }
}
